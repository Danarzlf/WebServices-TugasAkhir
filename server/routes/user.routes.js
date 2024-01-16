const router = require("express").Router();
const checkRole = require("../middlewares/checkRole");
const Auth = require("../middlewares/authentication");
const {
  register,
  login,
  verifyOtp,
  resendOtp,
  authenticateUser,
  changePasswordUser,
  getAllUsers,
} = require("../controllers/user.controllers");

router.post("/register", register);
router.post("/login", login);
router.put("/verify-otp", verifyOtp);
router.put("/resend-otp", resendOtp);
router.get(
  "/authenticate",
  Auth,
  checkRole(["User", "Admin"]),
  authenticateUser
);
router.put(
  "/change-password",
  Auth,
  checkRole(["User", "Admin"]),
  changePasswordUser
);

router.get("/all-users", Auth, getAllUsers);

router.get("/message", (req, res) => {
  res.send("Ini adalah pesan dari route GET");
});

module.exports = router;
