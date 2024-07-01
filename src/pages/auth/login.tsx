import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../modules/auth/auth-context";
import toast from "react-hot-toast";
import LoaderAuth from "../../components/loader-auth";
import "../../assets/styles/auth.scss";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigator = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (isSubmitted) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setLoading(true);

    try {
      await schema.validate(formData, { abortEarly: false });
      await login(formData.email, formData.password);

      toast.success("Успешно авторизован");
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            yupErrors[e.path] = e.message;
          }
        });
        setErrors(yupErrors);
      } else if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;
        if (apiError && apiError.message) {
          toast.error(apiError.message);
        } else {
          console.error("API error occurred:", error.message);
        }
      } else {
        console.error("Error occurred during login:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Неверный формат email адреса")
      .required("Поле email обязательно для заполнения"),
    password: Yup.string()
      .required("Поле пароль обязательно для заполнения")
      .min(8, "Пароль должен быть не менее 8 символов"),
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Мой аккаунт</h2>
      <div className="go-to-auth">
        <div className="go-login-active">Логин</div>
        <div
          className="go-to-register"
          onClick={() => navigator("/auth/register")}
        >
          Зарегистрироваться
        </div>
      </div>
      <div className="auth-input-box">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="login-form-input"
          placeholder="Email:"
        />
        {isSubmitted && errors.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
      </div>
      <div className="auth-input-box">
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="login-form-input"
          placeholder="Пароль:"
        />
        {isSubmitted && errors.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )}
      </div>
      <button type="submit" disabled={loading} className="login-submit">
        {loading ? <LoaderAuth /> : "Логин"}
      </button>
      <div className="check-auth">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        <label htmlFor="rememberMe">Запомнить меня</label>
      </div>
    </form>
  );
};

export default Login;
