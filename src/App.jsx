import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import BGIMG from "./assets/BGIMG.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div
        className="bg-black h-[600px] w-[350px] bg-cover bg-bottom bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${BGIMG})`,
        }}
      >
        <Router>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            newestOnTop={true}
            pauseOnFocusLoss
            toastClassName="custom-toast"
          />
          <AppRoutes />
      </Router>
      </div>
    </>
  );
}

export default App;
