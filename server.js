require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes/Controllers
require("./controllers/apiController")(app);
require("./controllers/htmlController")(app);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.FORCE_CREATE === "true" || process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
