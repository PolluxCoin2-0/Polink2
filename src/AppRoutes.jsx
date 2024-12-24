import { Routes, Route } from "react-router-dom";
import WalletOptionsPage from "./pages/WalletOptions/WalletOptionsPage";
import CreateWallet from "./pages/CreateWallet/CreateWallet";
import Logo from "./components/logo/Logo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Logo />} />
      <Route path="/WalletOptionsPage" element={<WalletOptionsPage />} />
      <Route path="/createwallet" element={<CreateWallet />} />
    </Routes>
  );
};

export default AppRoutes;


