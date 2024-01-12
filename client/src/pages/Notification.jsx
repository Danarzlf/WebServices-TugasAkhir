import React from "react";
import { Container } from "react-bootstrap";
import NavBarNotification from "../components/NavBarNotification";

const Notification = () => {
  return (
    <>
      <NavBarNotification />
      <Container>
        <p>this is Notifications</p>
      </Container>
    </>
  );
};

export default Notification;
