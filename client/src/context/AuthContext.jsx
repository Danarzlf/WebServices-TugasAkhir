import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
// Helper
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
} from "../helper/ToastHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  console.log("USERR", user);
  // console.log("loginInfo", loginInfo);
  // console.log("registerInfo", registerInfo);
  // console.log("registerError", registerError);

  //protecting route agar kalo direfresh data user tetep ada
  //pakai local
  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  //pakai cookie
  // useEffect(() => {
  //   const user = Cookies.get("User");
  //   // console.log("User dari Cookie:", user);

  //   try {
  //     const parsedUser = JSON.parse(user);
  //     setUser(parsedUser);
  //   } catch (error) {
  //     console.error("Error saat parsing user:", error);
  //     // Handle error disini, seperti menetapkan state pengguna default atau menghapus cookie
  //   }
  // }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        setLoginError(response);
        showErrorToast(response.message); // Show error toast
        return;
      }

      // if (response.error) {
      //   return setRegisterError(response);
      // }

      // Save user email to session storage
      sessionStorage.setItem("userEmail", registerInfo.email);

      // Navigate to OTP page
      navigate("/OTP");
    },
    [registerInfo, navigate]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);
      if (response.error) {
        setLoginError(response);
        showErrorToast(response.message); // Show error toast
        return;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);

      // Assuming your response contains a 'successMessage' field
      if (response.message) {
        showSuccessToast(response.message); // Show success toast from response
      }
    },
    [loginInfo]
  );

  const toggleShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const toggleShowLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const logoutUser = useCallback(() => {
    // Show logout confirmation modal
    showLogoutModal();
  }, []);

  const confirmLogout = () => {
    // Hide the logout confirmation modal
    hideLogoutModal();

    // Perform actual logout
    localStorage.removeItem("User");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        showRegisterPassword,
        toggleShowRegisterPassword,

        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        showLoginPassword,
        toggleShowLoginPassword,

        logoutUser,
        isLogoutModalVisible,
        hideLogoutModal,
        confirmLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
