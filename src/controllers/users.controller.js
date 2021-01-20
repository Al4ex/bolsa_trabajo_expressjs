const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");
usersCtrl.renderEmpleUpForm = (req, res) => {
  res.render('users/employer');
};

usersCtrl.singupEmple = async (req, res) => {
  let errors = [];
  const { name, email, nivel, password, confirm_password } = req.body;

  if (name.length <= 0) {
    errors.push({ text: "Escriba sus nombres" });
  }
  if (nivel.length <= 0) {
    errors.push({ text: "Escriba sus apellidos" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Escriba su correo" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/employer", {
      errors,
      name,
      email,
      nivel,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo esta en Uso.");
      res.redirect("/employer/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, nivel, email, rol:'2', password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Tw has registrado Exitosamente.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, apds, email, password, confirm_password } = req.body;
  if (name.length <= 0) {
    errors.push({ text: "Escriba sus nombres" });
  }
  if (apds.length <= 0) {
    errors.push({ text: "Escriba sus apellidos" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Escriba su correo" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      apds,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo esta en uso.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, apds, email, rol:'1', password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Tu estas registrado.");
      res.redirect("/users/signin");
      console.log(newUser)
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/work/registro",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Hasta la proxima.");
  res.redirect("/users/signin");
};


module.exports = usersCtrl;