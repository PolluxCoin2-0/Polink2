import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { generateKeys } from "../../utils/KryHelpers";
import { toast } from "react-toastify";

const CreateWallet = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log({location});
  const { dataObj } = location.state || {};

  console.log({dataObj});
  useEffect(()=>{
    if(dataObj){
      setName(dataObj?.WalletName);
      setPassword(dataObj?.password);
      setRePassword(dataObj?.password);
    }
  },[])

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleRePasswordVisibility = () => {
    setIsRePasswordVisible((prev) => !prev);
  };


  

  // Password validation criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  const allValid = hasUppercase && hasLowercase && hasNumber && hasMinLength;
  const passwordsMatch = password === rePassword;

 

  const handleCreateWallet = async () => {
    try {
      // Check if all input fields are filled
      if (!name || !password || !rePassword) {
        toast.error("Please fill all the input fields.");
        return;
      }
  
      // Check if passwords match
      if (password !== rePassword) {
        toast.error("Passwords do not match.");
        return;
      }
  
      // Generate wallet keys
      const data = dataObj?.data || generateKeys();
      console.log({data});
      const newDataObj  = {
        WalletName:name,
        password:password,
        data:data,
      }
  
      // Navigate to the backup mnemonic page with wallet data
      navigate("/backup-mnemonic", { state: { dataObj: newDataObj  } });
    } catch (error) {
      // Log and display error
      console.error("Error creating wallet:", error);
      toast.error("Please try again.");
    }
  };
  

  return (
    <div className="relative h-full w-full text-white py-6 px-4">
      {/* Header */}
      <div className="flex flex-row items-center space-x-20 mb-8">
        <IoIosArrowBack
          size={14}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
        />
        <p className="text-white font-semibold text-lg text-left">Create Wallet</p>
      </div>

      {/* Wallet Name */}
      <div className="mb-6">
        <input
          type="text"
          className="border border-[#252118] rounded-xl w-full py-3 text-sm px-4 placeholder:text-[#B0B0B0] bg-transparent outline-none text-white focus:border-[#FFBD00] transition-all"
          placeholder="Enter your Wallet Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="border border-[#252118] rounded-xl text-sm w-full py-3 px-4 placeholder:text-[#B0B0B0] bg-transparent outline-none text-white pr-12 focus:border-[#FFBD00] transition-all"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordVisible ? (
            <FiEyeOff
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#B0B0B0] cursor-pointer hover:text-[#FFBD00]"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FiEye
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#B0B0B0] cursor-pointer hover:text-[#FFBD00]"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <p className="text-[#B0B0B0] mt-2 text-sm">
          Please note that POX does not store the password and cannot retrieve
          it for you.
        </p>
      </div>

     

      {/* Password Criteria */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p
          className={`text-sm flex items-center ${
            hasUppercase ? "text-[#95FE65B2]" : "text-[#B0B0B0]"
          }`}
        >
          &#10003; Uppercase
        </p>
        <p
          className={`text-sm flex items-center ${
            hasLowercase ? "text-[#95FE65B2]" : "text-[#B0B0B0]"
          }`}
        >
          &#10003; Lowercase
        </p>
        <p
          className={`text-sm flex items-center ${
            hasNumber ? "text-[#95FE65B2]" : "text-[#B0B0B0]"
          }`}
        >
          &#10003; Number
        </p>
        <p
          className={`text-sm flex items-center ${
            hasMinLength ? "text-[#95FE65B2]" : "text-[#B0B0B0]"
          }`}
        >
          &#10003; At least 8 characters
        </p>
      </div>

      {/* Re-enter Password */}
      <div className="mb-12">
        <div className="relative">
          <input
            type={isRePasswordVisible ? "text" : "password"}
            className="border border-[#252118] text-sm rounded-xl w-full py-3 px-4 placeholder:text-[#B0B0B0] bg-transparent outline-none text-white pr-12 focus:border-[#FFBD00] transition-all"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          {isRePasswordVisible ? (
            <FiEyeOff
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#B0B0B0] cursor-pointer hover:text-[#FFBD00]"
              onClick={toggleRePasswordVisibility}
            />
          ) : (
            <FiEye
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#B0B0B0] cursor-pointer hover:text-[#FFBD00]"
              onClick={toggleRePasswordVisibility}
            />
          )}
        </div>
        {!passwordsMatch && rePassword.length > 0 && (
          <p className="text-sm mt-2 text-red-500">Passwords do not match</p>
        )}
      </div>

      {/* Create Wallet Button */}
      <div className="absolute bottom-10 w-full">
        <button
          className={`text-center text-black font-bold text-lg rounded-2xl bg-gradient-to-l from-[#FFBD00] to-[#FFBABA] py-3 cursor-pointer w-[90%] block hover:scale-105 transition-transform ${
            !allValid || !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!allValid || !passwordsMatch}
          onClick={handleCreateWallet}
        >
          Create Wallet
        </button>
      </div>
    </div>
  );
};

export default CreateWallet;
