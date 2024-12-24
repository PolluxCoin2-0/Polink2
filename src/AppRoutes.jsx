import { Routes, Route } from "react-router-dom";
import WalletOptionsPage from "./pages/WalletOptions/WalletOptionsPage";
import Logo from "./components/logo/Logo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Logo />} />
      <Route path="/WalletOptionsPage" element={<WalletOptionsPage />} />
    </Routes>
  );
};

export default AppRoutes;
