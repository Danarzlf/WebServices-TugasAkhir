import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OtpContext = createContext();

export const OtpContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move to the next input box
    if (value !== "" && event.target.nextSibling) {
      event.target.nextSibling.focus();
    }
  };

  const maskedEmail = email
    ? email.charAt(0) +
      "*".repeat(email.indexOf("@") - 1) +
      email.substring(email.indexOf("@"))
    : "";

  return (
    <OtpContext.Provider value={{ otp, email, handleChange, maskedEmail }}>
      {children}
    </OtpContext.Provider>
  );
};
