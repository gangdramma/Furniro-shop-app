import { useContext } from "react";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { Auth } from "../modules";
import { About, Products } from "../pages";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Main from "../pages/main/main";
import Protected from "./protected";

const Routes = () => {
  const { user } = useContext(Auth.Context);
  const isAuth = !user;
  return (
    <div className="routes">
      <Switch>
        <Route path="/">
          <Route index element={<Main />} />

          <Route path="/about" element={<About.About />} />

          <Route path="/auth" element={<Protected allowed={isAuth} to="/" />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Route>

          <Route path="/products">
            <Route index element={<Products.Products />} />
            <Route path=":productId" element={<Products.Single />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Route>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
