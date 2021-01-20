const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout,
  renderEmpleUpForm,
  singupEmple
} = require("../controllers/users.controller");

// Routes
router.get("/employer/signup", renderEmpleUpForm);

router.post("/employer/signup", singupEmple);



router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

module.exports = router;
