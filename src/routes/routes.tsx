import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { About, Products } from "../pages";
import Main from "../pages/main/main";

const Routes = () => {
  return (
    <div className="routes">
      <Switch>
        <Route path="/">
          <Route index element={<Main />} />

          <Route path="/about" element={<About.About />} />

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
