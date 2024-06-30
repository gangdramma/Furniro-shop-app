import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import LoaderAuth from "../../components/loader-auth";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: File | null;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormValues>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigator = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State for avatar preview

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });

      // Generate a preview URL for the selected avatar
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    // Programmatically trigger the file input when the avatar area is clicked
    const fileInput = document.getElementById("avatar");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setLoading(true);

    try {
      await schema.validate(formData, { abortEarly: false });

      const formDataToSend = new FormData();
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const response = await axios.post(
        "https://limitless-peak-31978-868db4faa179.herokuapp.com/api/v1/auth/register",
        formDataToSend
      );

      toast.success("Регистрация успешна!");
      navigator("/auth/login");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        avatar: null,
      });
      setAvatarPreview(null); // Clear avatar preview after successful registration
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
        console.error("Error occurred during registration:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const schema = Yup.object().shape({
    firstname: Yup.string().required("Поле имя обязательно для заполнения"),
    lastname: Yup.string().required("Поле фамилия обязательно для заполнения"),
    email: Yup.string()
      .email("Неверный формат email адреса")
      .required("Поле email обязательно для заполнения"),
    password: Yup.string().required("Поле пароль обязательно для заполнения"),
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Мой аккаунт</h2>
      <div className="go-to-auth">
        <div className="go-login" onClick={() => navigator("/auth/login")}>
          Логин
        </div>
        <div className="go-to-register-active">Зарегистрироваться</div>
      </div>
      <div className="auth-input-box">
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          className="login-form-input"
          placeholder="Имя:"
        />
        {isSubmitted && errors.firstname && (
          <div style={{ color: "red" }}>{errors.firstname}</div>
        )}
      </div>
      <div className="auth-input-box">
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          className="login-form-input"
          placeholder="Фамилия:"
        />
        {isSubmitted && errors.lastname && (
          <div style={{ color: "red" }}>{errors.lastname}</div>
        )}
      </div>
      <div className="auth-input-box">
        <input
          id="email"
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
          id="password"
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
      <div className="auth-input-box" onClick={handleAvatarClick}>
        <label htmlFor="avatar" className="avatar-input-label">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="avatar-preview"
            />
          ) : (
            <div className="avatar-placeholder">Выберите изображение</div>
          )}
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </div>
      <button type="submit" disabled={loading} className="login-submit">
        {loading ? <LoaderAuth /> : "Зарегистрироваться"}
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

export default Register;
