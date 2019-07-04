const api = require("./api");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {layout: 'backend'});
  });

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

  app.get("/home", function(req, res) {
    res.render("home");
  });

  app.get("/contact", function(req, res) {
    res.render("contact");
  });

  app.get("/assign", function(req, res) {
    api.getAllGames(games => {
      res.render("assign", { games });
    });
  });

  app.get("/assign/:gameid", function(req, res) {
    api.getGameById(req.params.gameid, function(game) {
      game.getReferees().then(assigned => {
        if (assigned.length >= game.numberOfReferees) {
          let available = [];
          res.render("assigngame", { game, assigned, available });
        } else {
          api.getAllAvailableReferees(game.id, function(available) {
            res.render("assigngame", { game, assigned, available });
          });
        }
      });
    });
  });

  app.get("/referee/games", function(req, res) {
    api.getRefereeByEmail(req.cookies.email, referee => {
      referee.getGames().then(games => {
        res.render("refereegames", { games });
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
