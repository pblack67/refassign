var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/game", function(req, res) {
    res.render("game");
  });

  app.get("/referee", function(req, res) {
    res.render("referee");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
