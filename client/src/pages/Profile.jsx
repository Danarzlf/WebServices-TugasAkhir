import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import NavBarProfile from "../components/NavBarProfile";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBarProfile />
      <Container>
        <p>This Is MyProfile</p>
      </Container>
    </>
  );
};

export default Profile;
