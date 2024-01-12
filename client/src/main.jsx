import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { OtpContextProvider } from "./context/OtpContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <OtpContextProvider>
          <App />
          <Toaster />
        </OtpContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
