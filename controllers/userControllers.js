const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", { pageTitle: "Login", path: "/login" });
};

exports.register = (req, res) => {
  res.render("register", { pageTitle: "register", path: "/register" });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body); //here check if there is problem it will go to catch

    //* checking email repeat
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ message: "the email has been used" });
      return res.render("register", {
        pageTitle: "register",
        path: "/register",
        errors,
      });
    }

    await User.create(req.body); // if there was not a problem this line will save it in database
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);

    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    return res.render("register", {
      pageTitle: "register",
      path: "/register",
      errors,
    });
  }
};
