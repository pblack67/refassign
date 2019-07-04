const api = require("./api");

module.exports = function(app) {
<<<<<<< HEAD
  app.get("/", function(req, res) {
    res.render("index", {layout: 'backend'});
=======
  app.get("/", (req, res) => {
    res.render("index");
>>>>>>> 9231bf50a4a4ddeb9e949fd04c9647d2c80687ea
  });

  app.get("/game", (req, res) => {
    api.getAllGames(games => {
      res.render("game", { games });
    });
  });

  app.get("/referee", (req, res) => {
    api.getAllReferees(referees => {
      res.render("referee", { referees });
    });
  });

<<<<<<< HEAD
  app.get("/home", function(req, res) {
    res.render("home");
=======
  app.get("/logIn", (req, res) => {
    res.render("logIn");
>>>>>>> 9231bf50a4a4ddeb9e949fd04c9647d2c80687ea
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.get("/assign", (req, res) => {
    api.getAllGames(games => {
      res.render("assign", { games });
    });
  });

  app.get("/assign/:gameid", (req, res) => {
    api.getGameById(req.params.gameid, game => {
      game.getReferees().then(assigned => {
        if (assigned.length >= game.numberOfReferees) {
          let available = [];
          res.render("assigngame", { game, assigned, available });
        } else {
          api.getAllAvailableReferees(game.id, available => {
            res.render("assigngame", { game, assigned, available });
          });
        }
      });
    });
  });

  app.get("/referee/games", (req, res) => {
    api.getRefereeByEmail(req.cookies.email, referee => {
      if (referee) {
        referee.getGames().then(games => {
          res.render("refereegames", { games });
        });
      } else {
        res.render("404");
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
