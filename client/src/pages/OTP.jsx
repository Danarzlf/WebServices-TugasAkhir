import { useContext } from "react";
import { OtpContext } from "../context/OtpContext";
import React, { useState, useEffect } from "react";
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

const OTP = () => {
  const { otp, email, handleChange, maskedEmail } = useContext(OtpContext);
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
              <Row
                style={{
                  height: "100vh",
                  justifyContent: "center",
                  alignItems: "center", // Center vertically
                }}
              >
                <Col xs={12} md={8} lg={5}>
                  <h1 className="fw-bold">Masukkan OTP</h1>
                  <p className="text-center mt-3 mt-sm-5 mb-4">
                    Ketik 6 digit kode yang dikirimkan ke{" "}
                    <span className="fw-bolder">{maskedEmail}</span>
                  </p>
                  <form className="text-center">
                    <div className="d-flex justify-content-center">
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={value}
                          onChange={(event) => handleChange(index, event)}
                          className="text-center"
                        />
                      ))}
                    </div>
                    {/* {error && <p className="text-danger mt-3 mb-3">{error}</p>} */}

                    <Button
                      className="otp__btn col-12 rounded-4 border-0 mt-2 mt-sm-5"
                      type="submit"
                    >
                      Simpan
                    </Button>
                  </form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OTP;
