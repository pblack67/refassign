const db = require("../models");
const moment = require("moment");

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

async function getAllAvailableReferees(gameid, callback) {
  let availableReferees = [];
  let dbReferees = await db.Referees.findAll({});
  let gameToAssign = await db.Games.findOne({
    where: { id: gameid }
  });

  console.log(gameToAssign.gameTime);
  let gameMomentString = moment(gameToAssign.gameTime).format("YYYYMMDD");

  for (let i = 0; i < dbReferees.length; i++) {
    let referee = dbReferees[i];
    let dbGames = await referee.getGames();
    let available = true;
    for (let j = 0; j < dbGames.length; j++) {
        let assignedMomentString = moment(dbGames[j].gameTime).format("YYYYMMDD");
        console.log(gameMomentString, assignedMomentString);
        if (gameMomentString == assignedMomentString) {
            available = false;
        }
    }
    if (available) {
      availableReferees.push(referee);
    }
  }
  callback(availableReferees);
}

module.exports = {
  getAllReferees,
  getAllGames,
  getAllAvailableReferees
};
