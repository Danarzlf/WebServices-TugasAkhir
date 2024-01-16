import { useContext } from "react";
import { Container } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import NavBar from "../../components/NavBar/NavBar";

const Chat = () => {
  // const { user } = useContext(AuthContext);
  const { userProfiles } = useContext(ProfileContext);

  return (
    <>
      <NavBar />
      <Container>
        {/* {user && (
          <span className="text-warning">
            Logged in as {user?.data?.user?.UserProfile?.fullName}
          </span>
        )} */}
        {userProfiles && (
          <span className="text-warning">
            Logged in as {userProfiles?.UserProfile?.fullName}
          </span>
        )}
      </Container>
    </>
  );
};

export default Chat;
