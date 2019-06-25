let db = require("../models");

module.exports = function (app) {
  // Get all referees
  app.get("/api/referees", (req, res) => {
    db.Referees.findAll({}).then(dbReferees => {
      res.json(dbReferees);
    });
  });

  // Create a referee
  app.post("/api/referees", (req, res) => {
    console.log(req.body);
    db.Referees.create(req.body).then(dbReferees => {
      res.json(dbReferees);
    });
  });

  // Delete a referee
  app.delete("/api/referees/:id", (req, res) => {
    db.Referees.destroy({ where: { id: req.params.id } }).then(dbReferees => {
      res.json(dbReferees);
    });
  });

  // Update a referee
  app.put("/api/referees/:id", (req, res) => {
    db.Referees.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(dbReferees => {
        res.json(dbReferees);
      });
  });


  // Get all games
  app.get("/api/games", (req, res) => {
    db.Games.findAll({}).then(dbGames => {
      res.json(dbGames);
    });
  });

  // Create a game
  app.post("/api/games", (req, res) => {
    console.log(req.body);
    db.Games.create(req.body).then(dbGames => {
      res.json(dbGames);
    });
  });

  // Delete a game
  app.delete("/api/games/:id", (req, res) => {
    db.Games.destroy({ where: { id: req.params.id } }).then(dbGames => {
      res.json(dbGames);
    });
  });

  // Update a game
  app.put("/api/games/:id", (req, res) => {
    db.Games.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(dbGames => {
        res.json(dbGames);
      });
  });

  // Get all games
  app.get("/api/assignments/referee/:id", (req, res) => {
    console.log(db.Referee);
    db.Referee.findAll({
      include: [
        {
          model: db.Games,
          attributes: ["school", "sport"],
          through: {
            attributes: []
          }
        }],
      where: { id: req.params.id }
    }).then(result => {
      console.log(result);
      res.json(result);
    })

    // User.findAll({
    //   include: [{
    //     model: Project,
    //       through: {
    //         attributes: ['createdAt', 'startedAt', 'finishedAt']
    //           where: {completed: true}
    //       }
    //    }] 
    //  });
    // const pugsWithFriends = await Pug.findAll({
    //   include: [{model: Friend}]
    // })
  });

};

