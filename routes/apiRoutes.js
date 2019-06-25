let db = require("../models");

module.exports = function (app) {
  // Get all referees
  app.get("/api/referees", (request, response) => {
    db.Referees.findAll({}).then(dbReferees => {
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
    db.Referees.destroy({ where: { id: request.params.id } }).then(dbReferees => {
      response.json(dbReferees);
    });
  });

  // Update a referee
  app.put("/api/referees/:id", (request, response) => {
    db.Referees.update(request.body,
      {
        where: {
          id: request.params.id
        }
      }).then(dbReferees => {
        response.json(dbReferees);
      });
  });


  // Get all games
  app.get("/api/games", (request, response) => {
    db.Games.findAll({}).then(dbGames => {
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
    db.Games.update(request.body,
      {
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
      referee.getGames().then(games => {
        response.json(games);
      });
    });
  });

  // Asssign referee to a game
  app.post("/api/assignments/referee/:refereeid/:gameid", (request, response) => {
    db.Referees.findOne({
      where: { id: request.params.refereeid }
    }).then(referee => {
      db.Games.findOne({
        where: { id: request.params.gameid }
      }).then(game => {
        referee.addGames([game]);
        response.json(true);
      });
    });
  });
};
