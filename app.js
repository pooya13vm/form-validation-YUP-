//* internal modules
const path = require("path");

//* external modules
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotenv");
const morgan = require("morgan");

//* import my modules
const connectDB = require("./config/db");

//*? define and config modules
const app = express();
dotEnv.config({ path: "./config/config.env" });
app.use(express.urlencoded({ extended: false }));

//*! logging (morgan)
if (process.env.NODE_ENV == "development") {
  console.log("hiihi");
  app.use(morgan("dev"));
}

//*! database connection
connectDB();

//*! View Engin
app.use(expressLayout);
app.set("layout", "./layouts/mainLayout");
app.set("view engine", "ejs");
app.set("views", "views");

//*! static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, process.env.BOOTSTRAP)));
app.use(express.static(path.join(__dirname, process.env.FONTAWESOME)));

//*! Router
app.use("/", require("./routes/blog"));
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
