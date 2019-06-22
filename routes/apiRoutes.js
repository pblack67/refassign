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

};
