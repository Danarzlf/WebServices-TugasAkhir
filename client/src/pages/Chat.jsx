import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/NavBar";

const Chat = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Container>
        {user && (
          <span className="text-warning">
            Logged in as {user?.data?.user?.UserProfile?.fullName}
          </span>
        )}
      </Container>
    </>
  );
};

export default Chat;
