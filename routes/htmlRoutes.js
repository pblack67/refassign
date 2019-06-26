const api = require("./api");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/game", function(req, res) {
    api.getAllReferees(games => {
      res.render("game", games);
    });
  });

  app.get("/referee", function(req, res) {
    api.getAllReferees(referees => {
      res.render("referee", referees);
    });
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
