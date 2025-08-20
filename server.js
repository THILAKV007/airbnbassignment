const express = require("express");
const path = require("path");
const createError = require("http-errors");
const cors = require("cors");
require("dotenv").config();
const config = require("./config/developmentProd.js");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
require("./config/db.js");

const port = process.env.port || config?.port || 5000;

global.__basedir = "./public";
app.use("/public/images/",express.static(path.join(__dirname, "public/images")));

// Set the view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/v1/user", require("./routers/userRouter.js"));
app.use('/api/v1/owners', require('./routers/ownersRouter.js'));
app.use('/api/v1/properties', require('./routers/propertiesRouter.js'));
app.use('/api/v1/reservations', require('./routers/reservationsRouter.js'));

app.get("/", (req, res) => {
  res.send("Server Is Running");
});

let server;
if (config.serverType == "http") {
  let http = require("http");
  server = http.createServer(app);
} else {
  let https = require("https");
  server = https.createServer(config.options, app);
}

server.listen(port, () => console.log("Express started at", port));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
