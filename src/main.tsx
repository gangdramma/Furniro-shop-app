import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Routes from "./routes/routes";

const Main = () => (
  <>
    <Navbar />
    <Routes />
    <Toaster position="top-center" reverseOrder={false} />
  </>
);

export default Main;
