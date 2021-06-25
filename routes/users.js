const { Router } = require("express");
const Yup = require("yup");

const schema = Yup.object().shape({
  fullName: Yup.string().required().min(4).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(4).max(25),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null]),
});

const router = new Router();

router.get("/register", (req, res) => {
  res.render("register", { pageTitle: "register", path: "/register" });
});

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "Login", path: "/login" });
});

router.post("/register", (req, res) => {
  schema
    .validate(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/users/login");
    })
    .catch((err) => {
      console.log(err);
      res.render("register", {
        pageTitle: "register",
        path: "/register",
        errors: err.errors,
      });
    });
});

module.exports = router;
