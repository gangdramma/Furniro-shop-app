import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import { AuthProvider } from "./modules/auth/auth-context";
import Routes from "./routes/routes";

const Main = () => (
  <>
    <AuthProvider>
      <Navbar />
      <Routes />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </>
);

export default Main;
