const { Router } = require("express");

const router = new Router();

//*! weblog Index page
router.get("/", (req, res) => {
  res.render("index", { pageTitle: "WEBLog", path: "/" });
});

module.exports = router;
