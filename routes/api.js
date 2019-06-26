const db = require("../models");

function getAllReferees(callback) {
  db.Referees.findAll({}).then(dbReferees => {
    callback(dbReferees);
  });
}

function getAllGames(callback) {
  db.Games.findAll({}).then(dbGames => {
    callback(dbGames);
  });
}

module.exports = {
  getAllReferees,
  getAllGames
};
