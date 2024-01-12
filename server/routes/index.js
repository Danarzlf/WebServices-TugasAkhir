// routes.js
const router = require("express").Router();

const User = require("./user.routes");

// router.get("/", (req, res) => {
//   res.render("templates/index");
// });

// API
router.use("/api/v1/users", User);

module.exports = router;
