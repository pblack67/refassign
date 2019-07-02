const db = require("../models");
const api = require("./api");
const sendAssignmentMail = require("./sendAssignmentMail");

module.exports = function(app) {
  // Create login cookie
  app.post("/login/userdata", (request, response) => {
    console.log(request.body);
    response.cookie("email", request.body.email);
    response.cookie("role", request.body.role);
    response.end();
  });

  // Get all referees
  app.get("/api/referees", (request, response) => {
    api.getAllReferees(dbReferees => {
      response.json(dbReferees);
    });
  });

  // Create a referee
  app.post("/api/referees", (request, response) => {
    db.Referees.create(request.body).then(dbReferees => {
      response.json(dbReferees);
    });
  });

  // Delete a referee
  app.delete("/api/referees/:id", (request, response) => {
    db.Referees.destroy({ where: { id: request.params.id } }).then(
      dbReferees => {
        response.json(dbReferees);
      }
    );
  });

  // Update a referee
  app.put("/api/referees/:id", (request, response) => {
    db.Referees.update(request.body, {
      where: {
        id: request.params.id
      }
    }).then(dbReferees => {
      response.json(dbReferees);
    });
  });

  // Get all games
  app.get("/api/games", (request, response) => {
    api.getAllGames(dbGames => {
      response.json(dbGames);
    });
  });

  // Create a game
  app.post("/api/games", (request, response) => {
    console.log(request.body);
    db.Games.create(request.body).then(dbGames => {
      response.json(dbGames);
    });
  });

  // Delete a game
  app.delete("/api/games/:id", (request, response) => {
    db.Games.destroy({ where: { id: request.params.id } }).then(dbGames => {
      response.json(dbGames);
    });
  });

  // Update a game
  app.put("/api/games/:id", (request, response) => {
    db.Games.update(request.body, {
      where: {
        id: request.params.id
      }
    }).then(dbGames => {
      response.json(dbGames);
    });
  });

  // Get all games for a given referee
  app.get("/api/assignments/referee/:id", (request, response) => {
    db.Referees.findOne({
      where: { id: request.params.id }
    }).then(referee => {
      if (referee) {
        referee.getGames().then(games => {
          response.json(games);
        });
      } else {
        response.json(false);
      }
    });
  });

  // Assign referee to a game
  app.post(
    "/api/assignments/referee/:refereeid/:gameid",
    (request, response) => {
      db.Referees.findOne({
        where: { id: request.params.refereeid }
      }).then(referee => {
        if (referee) {
          db.Games.findOne({
            where: { id: request.params.gameid }
          }).then(game => {
            if (game) {
              referee.addGames([game]);
              sendAssignmentMail(referee, game);
              response.json(true);
            } else {
              response.json(false);
            }
          });
        } else {
          response.json(false);
        }
      });
    }
  );

  // Unassign a referee from a game
  app.delete(
    "/api/assignments/referee/:refereeid/:gameid",
    (request, response) => {
      db.Referees.findOne({
        where: { id: request.params.refereeid }
      }).then(referee => {
        if (referee) {
          db.Games.findOne({
            where: { id: request.params.gameid }
          }).then(game => {
            if (game) {
              referee.removeGame([game]);
              response.json(true);
            } else {
              response.json(false);
            }
          });
        } else {
          response.json(false);
        }
      });
    }
  );

  // Get all referees for a given game
  app.get("/api/assignments/game/:id", (request, response) => {
    db.Games.findOne({
      where: { id: request.params.id }
    }).then(game => {
      if (game) {
        game.getReferees().then(referees => {
          response.json(referees);
        });
      } else {
        response.json(false);
      }
    });
  });

  // Asssign game to a referee
  app.post("/api/assignments/game/:gameid/:refereeid", (request, response) => {
    db.Games.findOne({
      where: { id: request.params.gameid }
    }).then(game => {
      if (game) {
        db.Referees.findOne({
          where: { id: request.params.refereeid }
        }).then(referee => {
          if (referee) {
            game.addReferee([referee]);
            response.json(true);
          } else {
            response.json(false);
          }
        });
      } else {
        response.json(false);
      }
    });
  });
  // get available refs for a game
  app.get("/api/availability/:gameid", (request, response) => {
    api.getAllAvailableReferees(request.params.gameid, results => {
      response.json(results);
    });
  });

  // get available games for a ref
  app.get("/api/gamability/:refereeid", (request, response) => {
    api.getAllAvailableGames(request.params.refereeid, results => {
      response.json(results);
    });
  });

  // Get all games with spots remaining
  app.get("/api/assignments/availableGames", (request, response) => {
    api.getGamesWithOpenings(dbGames => {
      response.json(dbGames);
    });
  });
}; // module closing bracket
