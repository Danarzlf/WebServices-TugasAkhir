const path = require("path");
const { User, UserProfile } = require("../models"); // Import your Sequelize models
const imagekit = require("../libs/imagekit");

module.exports = {
  // Controller to update user profile information
  updateProfile: async (req, res, next) => {
    try {
      const { fullName, phoneNumber, city, country } = req.body;
      const file = req.file;
      let imageURL;

      // Validation checks for mandatory fields
      //   if (!fullName || !phoneNumber || !city || !country) {
      //     return res.status(400).json({
      //       status: false,
      //       message: "Please provide fullName, phoneNumber, city, and country",
      //       data: null,
      //     });
      //   }

      // Validation check for full name length
      if (fullName.length > 50) {
        return res.status(400).json({
          status: false,
          message:
            "Invalid full name length. It must be at most 50 characters.",
          data: null,
        });
      }

      // Validation checks for phone number format and length
      if (phoneNumber) {
        if (!/^\d+$/.test(phoneNumber)) {
          return res.status(400).json({
            status: false,
            message:
              "Invalid phone number format. It must contain only numeric characters.",
            data: null,
          });
        }

        if (phoneNumber.length < 10 || phoneNumber.length > 12) {
          return res.status(400).json({
            status: false,
            message:
              "Invalid phone number length. It must be between 10 and 12 characters.",
            data: null,
          });
        }
      }

      // Handle file upload if a new profile picture is provided
      if (file) {
        const strFile = file.buffer.toString("base64");

        const { url } = await imagekit.upload({
          fileName: Date.now() + path.extname(req.file.originalname),
          file: strFile,
        });

        imageURL = url;
      }

      // Update user profile in the database using Sequelize
      const [, [updatedUserProfile]] = await UserProfile.update(
        {
          profilePicture: imageURL,
          fullName,
          phoneNumber,
          city,
          country,
        },
        {
          where: {
            userId: req.user.id,
          },
          returning: true, // Ensure to get the updated row as the second element of the result array
        }
      );

      return res.status(200).json({
        status: true,
        message: "Profile updated successfully",
        data: { updatedUserProfile },
      });
    } catch (err) {
      next(err);
    }
  },
};
