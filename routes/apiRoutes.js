var db = require("../models");

module.exports = function(app) {
  // Get all referees
  app.get("/api/referees", function(req, res) {
    db.Referee.findAll({}).then(function(dbReferee) {
      res.json(dbReferee);
    });
  });

  // Create a new example
  app.post("/api/referees", function(req, res) {
    db.Referee.create(req.body).then(function(dbReferee) {
      res.json(dbReferee);
    });
  });

  // Delete an example by id
  app.delete("/api/referees/:id", function(req, res) {
    db.Referee.destroy({ where: { id: req.params.id } }).then(function(dbReferee) {
      res.json(dbReferee);
    });
  });
};
