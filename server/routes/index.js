// routes.js
const router = require("express").Router();

const User = require("./user.routes");
const UserProfile = require("./userProfile.routes");

// router.get("/", (req, res) => {
//   res.render("templates/index");
// });

// API
router.use("/api/v1/users", User);
router.use("/api/v1/user-profiles", UserProfile);

module.exports = router;
