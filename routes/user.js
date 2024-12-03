const { Router } = require("express");
const {
  showUserSignUpPage,
  showUserSignInPage,
  handleUserSignUp,
  handleUserSignIn,
  handleLogOut
} = require("../controllers/user");

const router = Router();

router.get("/signin", showUserSignInPage);
router.get("/signup", showUserSignUpPage);
router.post("/signin", handleUserSignIn);
router.post("/signup", handleUserSignUp);
router.get("/logout", handleLogOut)
module.exports = router;
