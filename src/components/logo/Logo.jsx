
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const [text, setText] = useState("");
  const fullText = "Polink"; // Text to animate
  const typingSpeed = 150; // Typing speed in ms
  const navigate = useNavigate();

  useEffect(() => {
    const isWalletCreated = localStorage.getItem("walletPasswordHash");

    if (isWalletCreated) {
      // If wallet is already created, redirect to the dashboard
      navigate("/dashboard");
      return;
    }

    let index = 0;

    const typewriter = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typewriter); // Stop typing
        setTimeout(() => {
          navigate("/WalletOptionsPage"); // Redirect after animation
        }, 1000); // Delay before navigation
      }
    }, typingSpeed);

    return () => clearInterval(typewriter); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent">
        {text}
      </p>
    </div>
  );
};

export default Logo;
