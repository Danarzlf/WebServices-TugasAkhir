import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import NavBarProfile from "../../components/NavBar/NavBarProfile";
import LinkUpProfile from "../../components/Profile/LinkUpProfile";
import StatisticProfile from "../../components/Profile/StatisticProfile";
import LogoutModal from "../../components/Modals/LogoutModal";
import "../../components/styles/Profile.css";

const Profile = () => {
  const {
    user,
    logoutUser,
    isLogoutModalVisible,
    hideLogoutModal,
    confirmLogout,
  } = useContext(AuthContext);
  const {
    userProfiles,
    isUserProfilesLoading,
    userProfilesError,
    formData,
    setFormData,
    handleFormSubmit,
  } = useContext(ProfileContext);

  return (
    <>
      <NavBarProfile />
      <Container>
        <div className="main-body">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav>
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    {userProfiles?.UserProfile.profilePicture ? (
                      <img
                        src={userProfiles?.UserProfile.profilePicture}
                        alt="Profile"
                        className="rounded-circle"
                        width={150}
                      />
                    ) : (
                      <img
                        src="profile-null.png" // Replace with the path to your default image
                        alt="Default Profile"
                        className="rounded-circle"
                        width={150}
                      />
                    )}
                    <div className="mt-3">
                      <h4>{userProfiles?.UserProfile?.fullName}</h4>
                      <p className="text-secondary mb-1">
                        Full Stack Developer
                      </p>
                      <p className="text-muted font-size-sm">
                        {userProfiles?.UserProfile?.city},
                        {userProfiles?.UserProfile?.country}
                      </p>
                      {/* <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">
                        Message
                      </button> */}
                      <br />
                      <button
                        onClick={() => logoutUser()}
                        className="btn btn-danger"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <LinkUpProfile />
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="fullName" className="form-label">
                          Full Name
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={userProfiles?.email}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="phoneNumber" className="form-label">
                          Phone
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          className="form-control"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <label htmlFor="city" className="form-label">
                          Image
                        </label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          className="form-control"
                          id="city"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.files[0],
                            })
                          }
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        {/* <button className="btn btn-info">Edit</button> */}
                        <button type="submit" className="btn btn-info">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>

                  <p className="text-end" style={{ fontStyle: "italic" }}>
                    {userProfiles?.UserProfile?.updatedAt &&
                      `Profil diperbarui pada ${new Date(
                        userProfiles.UserProfile?.updatedAt
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`}
                  </p>
                  <p className="text-end" style={{ fontStyle: "italic" }}>
                    {userProfiles?.createdAt &&
                      `Akun dibuat pada ${new Date(
                        userProfiles.createdAt
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`}
                  </p>
                  {/* <StatisticProfile /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <LogoutModal
        show={isLogoutModalVisible}
        handleClose={hideLogoutModal}
        handleLogout={confirmLogout}
      />
    </>
  );
};

export default Profile;
