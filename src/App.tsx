import "./App.css";
import AppRoutes from "./Routes/Routers";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  return (
    <div className="w-[100%] min-h-[100vh]">
      <Toaster /> 
      <ScrollToTop></ScrollToTop>
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
