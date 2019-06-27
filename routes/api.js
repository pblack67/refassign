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
//   console.log(gameToAssign.gameTime);
//   let justDate = new String(gameToAssign.gameTime).split("T")[0];
//   console.log(justDate);
//   let gameMoment = moment(justDate);
//   console.log(gameMoment);
  for (let i = 0; i < dbReferees.length; i++) {
    let referee = dbReferees[i];
    let dbGames = await referee.getGames();
    let available = true;
    for (let j = 0; j < dbGames.length; j++) {
      //   console.log(dbGames[j].schoolName);
      // Compare referee games with potential assignment
      // If the referee is "busy" then don't add him to the available list
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
