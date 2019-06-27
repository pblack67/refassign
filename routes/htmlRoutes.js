var api = require("../routes/api");

module.exports = function(app) {
  app.get("/game", function(req, res) {
    api.getAllGames(games => {
      res.render("game", { games });
    });
  });

  app.get("/referee", function(req, res) {
    api.getAllReferees(referees => {
      res.render("referee", { referees });
    });
  });

  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
