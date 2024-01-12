import { useContext } from "react";
import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  Stack,
  Container,
} from "react-bootstrap";
import loginLogo from "/vite.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../components/styles/Register.css";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    showRegisterPassword,
    toggleShowRegisterPassword,
  } = useContext(AuthContext);
  return (
    <>
      <Container fluid>
        <div className="row align-items-center">
          <div
            className="col-md-4 d-none d-md-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "var(--main-color)",
              padding: "0",
              height: "100vh",
            }}
          >
            <img
              src={loginLogo}
              alt="background"
              style={{
                width: "35%",
                height: "auto", // Adjust height if needed
              }}
            />
          </div>
          <div className="log col-md-8 col-lg-8 col-md-5 mx-auto">
            <div className="row">
              <Form onSubmit={registerUser}>
                <Row
                  style={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center", // Center vertically
                  }}
                >
                  <Col xs={6}>
                    <Stack gap={3}>
                      <h2 className="title-register">Register</h2>

                      <Form.Control
                        type="text"
                        placeholder="Slamet Riyadi"
                        onChange={(e) =>
                          updateRegisterInfo({
                            ...registerInfo,
                            fullName: e.target.value,
                          })
                        }
                      />
                      <Form.Control
                        type="email"
                        placeholder="slamet@gmail.com"
                        onChange={(e) =>
                          updateRegisterInfo({
                            ...registerInfo,
                            email: e.target.value,
                          })
                        }
                      />
                      <Form.Control
                        type="number"
                        placeholder="081233456789"
                        onChange={(e) =>
                          updateRegisterInfo({
                            ...registerInfo,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <Form.Control
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="**********"
                        onChange={(e) =>
                          updateRegisterInfo({
                            ...registerInfo,
                            password: e.target.value,
                          })
                        }
                      />
                      <Form.Check
                        type="checkbox"
                        label="Show Password"
                        onChange={toggleShowRegisterPassword}
                      />
                      <Button className="btn-login" type="submit">
                        {isRegisterLoading
                          ? "Creating your account"
                          : "Register"}
                      </Button>
                      {/* {registerError?.error && (
                        <Alert variant="danger">
                          <p>{registerError?.message}</p>
                        </Alert>
                      )} */}
                      <h3 className="to-login">
                        Sudah punya akun?{" "}
                        <span>
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            Login di sini.
                          </Link>
                        </span>
                      </h3>
                    </Stack>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
