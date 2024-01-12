import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import OTP from "./pages/OTP";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* <NavBar /> */}

      <Routes>
        {/* conditional apabila data user ada maka dihalama chat */}
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route
          path="/notification"
          element={user ? <Notification /> : <Login />}
        />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
