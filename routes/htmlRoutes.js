const api = require("./api");

module.exports = function (app) {


  app.get("/", function (req, res) {
    // api.getAllGames(games => api.getAllReferees(referees => {
      res.render("index")
    })
  //   )
  // })
  
  app.get("/game", function (req, res) {
    api.getAllGames(games => {
      res.render("game", { games });
    });
  });

  app.get("/referee", (req, res) => {
    api.getAllReferees(referees => {
      res.render("referee", { referees });
    });
  });

  // app.get("/logIn", (req, res) => {
  //   res.render("logIn");
  // });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.get("/assign", (req, res) => {
    api.getAllGames(games => {
      res.render("assign", { games });
    });
  });

  // Display page with all available refrees for this game if there are still spots to fill
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

  // Display page for all games assigned to a given referee
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
