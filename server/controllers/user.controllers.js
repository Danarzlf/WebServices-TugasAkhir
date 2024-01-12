const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatedOTP } = require("../utils/otpGenerator");
const nodemailer = require("../utils/nodemailer");
const { User, UserProfile, Notification } = require("../models");
const { Op } = require("sequelize");

const { JWT_SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    let { fullName, email, phoneNumber, password, role } = req.body;
    const passwordValidator =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
        data: null,
      });
    }

    // Validate full name length
    if (fullName.length > 50) {
      return res.status(400).json({
        status: false,
        message: "Invalid full name length. It must be at most 50 characters.",
        data: null,
      });
    }

    // Check for existing user with the same email or phone number
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { "$UserProfile.phoneNumber$": phoneNumber }],
      },
      include: [{ model: UserProfile, as: "UserProfile" }],
    });

    if (existingUser) {
      if (existingUser.googleId) {
        return res.status(409).json({
          status: false,
          message:
            "User already registered using Google OAuth. Please use Google OAuth to log in.",
          data: null,
        });
      }

      return res.status(409).json({
        status: false,
        message: "Email or phone number already exists",
        data: null,
      });
    }

    // Validate email format
    if (!emailValidator.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format.",
        data: null,
      });
    }

    // Validate phone number format
    if (!/^\d+$/.test(phoneNumber)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid phone number format. It must contain only numeric characters.",
        data: null,
      });
    }

    // Validate phone number length
    if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid phone number length. It must be between 10 and 12 characters.",
        data: null,
      });
    }

    // Validate password format
    if (!passwordValidator.test(password)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long.",
        data: null,
      });
    }

    // Generate and store OTP for email verification
    const otpObject = generatedOTP();
    const otp = otpObject.code;
    const otpCreatedAt = otpObject.createdAt;

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user and user profile records
    const newUser = await User.create({
      email,
      password: encryptedPassword,
      otp,
      otpCreatedAt,
      role,
    });

    const newUserProfile = await UserProfile.create({
      fullName,
      phoneNumber,
      userId: newUser.id,
    });

    // Send email verification OTP
    // Send email verification OTP
    const html = await nodemailer.getHtml("verify-otp.ejs", { email, otp });
    await nodemailer.sendEmail(email, "Email Activation", html);

    res.status(201).json({
      status: true,
      message: "Registration successful",
      data: { newUser, newUserProfile },
    });
  } catch (err) {
    next(err);
  }
};

// Controller for user login
const login = async (req, res, next) => {
  try {
    let { emailOrPhoneNumber, password } = req.body;

    // Validate required fields
    if (!emailOrPhoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
        data: null,
      });
    }

    // Find user record based on email or phone number
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrPhoneNumber },
          { "$UserProfile.phoneNumber$": emailOrPhoneNumber },
        ],
      },

      include: [
        {
          model: UserProfile,
          as: "UserProfile", // Assuming the UserProfile model is associated with User model
        },
      ],
    });
    console.log("REQ11 user", req.user);

    // Return error if user not found
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or Password!",
        data: null,
      });
    }

    if (!user.password && user.googleId) {
      return res.status(401).json({
        status: false,
        message: "Authentication failed. Please use Google OAuth to log in.",
        data: null,
      });
    }

    // Check if the provided password is correct
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email or Password!",
        data: null,
      });
    }

    // Return error if the user account is not verified
    if (!user.isVerified) {
      return res.status(403).json({
        status: false,
        message: "Account not verified. Please check your email!",
        data: null,
      });
    }

    // Generate JWT token for authentication
    let token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

// Controller for verifying email OTP
const verifyOtp = async (req, res, next) => {
  try {
    let { email, otp } = req.body;
    // Set OTP expiration time to 30 minutes
    const otpExpired = 3 * 60 * 1000;

    // Find the user based on the provided email
    let user = await User.findOne({
      where: { email },
    });

    // Return error if user not found
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    // Return error if the provided OTP is incorrect
    if (user.otp !== otp) {
      return res.status(401).json({
        status: false,
        message: "Invalid OTP",
        data: null,
      });
    }

    const currentTime = new Date();
    const isExpired = currentTime - user.otpCreatedAt > otpExpired;

    if (isExpired) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired. Please request a new one.",
        data: null,
      });
    }

    // Update user's verification status
    let updateUser = await User.update(
      { isVerified: true },
      { where: { email } }
    );

    // Fetch the updated user after the update operation
    const updatedUser = await User.findOne({ where: { email } });

    res.status(200).json({
      status: true,
      message: "Activation successful",
      data: updateUser,
    });
  } catch (err) {
    next(err);
  }
};

// Controller to resend OTP for email verification
const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate a new OTP and its creation timestamp
    const otpObject = generatedOTP();
    otp = otpObject.code;
    otpCreatedAt = otpObject.createdAt;

    // Send the new OTP via email
    const html = await nodemailer.getHtml("verify-otp.ejs", { email, otp });
    await nodemailer.sendEmail(email, "Email Activation", html);

    // Update user's OTP and OTP creation timestamp
    await User.update(
      { otp, otpCreatedAt }, // Data to update
      { where: { email } } // Condition to identify the user
    );

    // Fetch the updated user after the update operation
    const updatedUser = await User.findOne({ where: { email } });

    res.status(200).json({
      status: true,
      message: "Resend OTP successful",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// Controller to authenticate a user based on their ID
const authenticateUser = async (req, res, next) => {
  try {
    // Find the user based on their ID and include their profile information
    const user = await User.findOne({
      where: { id: req.user.id }, // Assuming req.user.id holds the user's ID
      include: [
        {
          model: UserProfile, // Assuming the alias for the user's profile is 'userProfile'
        },
        {
          model: Notification,
        },
      ],
    });
    // console.log("REQQQQ", req.user);

    // Return error if user not found
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Authentication successful",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

// Controller to change the user's password
const changePasswordUser = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, newPasswordConfirmation } = req.body;

    // Validate required parameters
    if (!oldPassword || !newPassword || !newPasswordConfirmation) {
      return res.status(400).json({
        status: false,
        message:
          "Please provide oldPassword, newPassword, and newPasswordConfirmation",
        data: null,
      });
    }

    // Validate old password
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: "Incorrect old password",
        data: null,
      });
    }

    // Validate new password format
    const passwordValidator =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    if (!passwordValidator.test(newPassword)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long.",
        data: null,
      });
    }

    // Validate new password confirmation
    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({
        status: false,
        message: "Please ensure that the new password and confirmation match!",
        data: null,
      });
    }

    // Hash the new password
    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.update(
      { password: encryptedNewPassword },
      { where: { id: req.user.id } }
    );

    // Create notificationn (assuming you have a Notification model)
    await Notification.create({
      title: "Notification",
      message: "Password successfully changed!",
      userId: req.user.id,
      createdAt: new Date(),
    });

    res.status(200).json({
      status: true,
      message: "Your password has been successfully changed",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    // Ambil semua data pengguna dari tabel
    const users = await User.findAll({
      include: UserProfile,
    });

    res.status(200).json({
      status: true,
      message: "All users retrieved successfully",
      data: { users },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
  resendOtp,
  authenticateUser,
  changePasswordUser,
  getAllUsers,
};
