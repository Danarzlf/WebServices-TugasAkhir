// ProfileContextProvider.js

import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userProfiles, setUserProfiles] = useState(null);
  const [isUserProfilesLoading, setIsUserProfilesLoading] = useState(false);
  const [userProfilesError, setUserProfilesError] = useState(null);

  // Create state to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    city: "",
    image: null,
    // Add more fields as needed
  });

  useEffect(() => {
    // Update the form data with the user profile data when it is available
    if (userProfiles) {
      setFormData({
        fullName: userProfiles?.UserProfile?.fullName || "",
        phoneNumber: userProfiles?.UserProfile?.phoneNumber || "",
        country: userProfiles?.UserProfile?.country || "",
        city: userProfiles?.UserProfile?.city || "",
        image: userProfiles?.UserProfile?.profilePicture || null,
      });
    }
  }, [userProfiles]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("fullName", formData.fullName);
      formDataObj.append("phoneNumber", formData.phoneNumber);
      formDataObj.append("country", formData.country);
      formDataObj.append("city", formData.city);
      formDataObj.append("image", formData.image);

      const user = JSON.parse(localStorage.getItem("User"));

      const response = await fetch(
        "http://localhost:3000/api/v1/user-profiles/update-profile",
        {
          method: "PUT",
          body: formDataObj,
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log("Profile updated successfully", responseData);
    } catch (error) {
      console.error("Error updating profile", error.message);
    }
  };
  useEffect(() => {
    const getUserProfiles = async () => {
      const user = JSON.parse(localStorage.getItem("User"));

      try {
        const response = await getRequest(`${baseUrl}/users/authenticate`, {
          Authorization: `Bearer ${user.data.token}`,
        });

        setIsUserProfilesLoading(false);

        if (response.error) {
          return setUserProfilesError(response);
        }

        setUserProfiles(response.data.user);
      } catch (error) {
        setIsUserProfilesLoading(false);
        setUserProfilesError({
          error: "An error occurred while fetching user profiles.",
        });
      }
    };

    getUserProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        userProfiles,
        isUserProfilesLoading,
        userProfilesError,
        formData,
        setFormData,
        handleFormSubmit,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
