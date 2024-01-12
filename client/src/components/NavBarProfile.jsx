import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Stack,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { BiSearchAlt } from "react-icons/bi";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuLogOut, LuUser } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import LogoutModal from "./Modals/LogoutModal";
import "./styles/NavBar.css";

const NavBarProfile = () => {
  const {
    user,
    logoutUser,
    isLogoutModalVisible,
    hideLogoutModal,
    confirmLogout,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar
        className="navbar mb-4"
        style={{ height: "5.5rem", padding: "0 150px" }}
      >
        <Container fluid>
          <h2>
            <img src="/vite.svg" alt="ChatApp Logo" className="logo-image" />
            <Link to="/" className="text-logo link-light text-decoration-none">
              WebServices
            </Link>
          </h2>

          {/* <div className="relative">
            <input
              type="text"
              placeholder="Cari yang terbaik..."
              className="h-[3rem] w-[12rem] cursor-pointer rounded-xl bg-white px-3 py-2 md:w-[20rem] lg:w-[30rem]"
            />
            <BiSearchAlt
              size={30}
              className="absolute inset-y-2 right-4 hidden cursor-pointer rounded bg-primary p-1 text-white md:flex lg:flex"
            />
          </div> */}

          <Nav>
            <Stack direction="horizontal" gap={5}>
              {user && (
                <>
                  <Link to="/" className="link-light text-decoration-none">
                    <IoIosList
                      size={33}
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  </Link>
                  <Link
                    to="/notification"
                    className="link-light text-decoration-none"
                  >
                    <IoIosNotificationsOutline
                      size={33}
                      className="hidden lg:flex"
                    />
                  </Link>

                  <NavDropdown
                    id="basic-nav-dropdown"
                    title={
                      <Button size="sm" className="nav-bg-profile">
                        <div className="nav-page">
                          <LuUser size={30} />
                          Akun
                        </div>
                      </Button>
                    }
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <FaUser size={17} />
                        <span>Profile</span>
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <div className="flex items-center gap-3">
                        <LuLogOut size={17} />
                        <span onClick={() => logoutUser()}>Logout</span>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {!user && (
                <>
                  <Link to="/login" className="link-light text-decoration-none">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="link-light text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
      <LogoutModal
        show={isLogoutModalVisible}
        handleClose={hideLogoutModal}
        handleLogout={confirmLogout}
      />
    </div>
  );
};

export default NavBarProfile;
