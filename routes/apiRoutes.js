let db = require("../models");

module.exports = function (app) {
  // Get all referees
  app.get("/api/referees", (req, res) => {
    db.Referee.findAll({}).then(dbReferee => {
      res.json(dbReferee);
    });
  });

  // Create a referee
  app.post("/api/referees", (req, res) => {
    console.log(req.body);
    db.Referee.create(req.body).then(dbReferee => {
      res.json(dbReferee);
    });
  });

  // Delete a referee
  app.delete("/api/referees/:id", (req, res) => {
    db.Referee.destroy({ where: { id: req.params.id } }).then(dbReferee => {
      res.json(dbReferee);
    });
  });

  // Update a referee
  app.put("/api/referees/:id", (req, res) => {
    db.Referee.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(dbReferee => {
        res.json(dbReferee);
      });
  });


  // Get all games
  app.get("/api/games", (req, res) => {
    db.Game.findAll({}).then(dbGame => {
      res.json(dbGame);
    });
  });

  // Create a game
  app.post("/api/games", (req, res) => {
    console.log(req.body);
    db.Game.create(req.body).then(dbGame => {
      res.json(dbGame);
    });
  });

  // Delete a game
  app.delete("/api/games/:id", (req, res) => {
    db.Game.destroy({ where: { id: req.params.id } }).then(dbGame => {
      res.json(dbGame);
    });
  });

  // Update a game
  app.put("/api/games/:id", (req, res) => {
    db.Game.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(dbGame => {
        res.json(dbGame);
      });
  });

  // Get all games
  app.get("/api/assignments/referee/:id", (req, res) => {
    db.Referee.findAll({
      include: [{
        model: db.Game,
        attributes: ['school', 'sport'],
        through: {
          attributes: []
        }
      }],
      where: {id: req.params.id}
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

