import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/user/Chat";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import NavBar from "./components/NavBar/NavBar";
import Notification from "./pages/user/Notification";
import Profile from "./pages/user/Profile";
import Error404 from "./pages/error/Error404";
import OTP from "./pages/user/OTP";

//Style
import "bootstrap/dist/css/bootstrap.min.css";

//Context
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Token Protected
import TokenProtected from "./components/protected/TokenProtected";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* <NavBar /> */}

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route
          path="/notification"
          element={
            <TokenProtected>
              <Notification />
            </TokenProtected>
          }
        />
        <Route
          path="/profile"
          element={
            <TokenProtected>
              <Profile />
            </TokenProtected>
          }
        />

        <Route path="/otp" element={<OTP />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
