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
// Puts all available refs for a particular game in a list
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
      if (gameMomentString === assignedMomentString) {
        available = false;
      }
    }
    if (available) {
      availableReferees.push(referee);
    }
  }
  callback(availableReferees);
}

// Puts all available games for a particular ref in a list
async function getAllAvailableGames(refereeid, callback) {
  let availableGames = [];
  let dbGames = await db.Games.findAll({});
  let refGettingGame = await db.Referees.findOne({
    where: { id: refereeid }
  });
  for (let i = 0; i < dbGames.length; i++) {
    // loop thru all the games
    let gameMomentString = moment(dbGames[i].gameTime).format("YYYYMMDD");
    console.log("dbGames[i]", dbGames[i].dataValues);
    let refereeInGames = await refGettingGame.getGames(); //gets games of the specified ref
    let available = true;
    if (refereeInGames.length === 0) {
      console.log("length1", refereeInGames.length);
      available = true;
    } else {
      for (let j = 0; j < refereeInGames.length; j++) {
        // looping thru all games the ref is prev assigned
        let assignedMomentString = moment(refereeInGames[j].gameTime).format(
          "YYYYMMDD"
        ); // assigning all times ref in to a var
        console.log(gameMomentString, assignedMomentString);
        if (gameMomentString === assignedMomentString) {
          available = false;
        }
      }
    }
    console.log(available);
    if (available) {
      availableGames.push(dbGames[i]);
    }
  }
  callback(availableGames);
}

// Get all games with referee openings
async function getGamesWithOpenings(callback) {
  let availGamesArray = [];
  let dbGames = await db.Games.findAll({});
  for (let i = 0; i < dbGames.length; i++) {
    let game = dbGames[i];
    let refInGames = await game.getReferees();
    let numOfRefInGames = refInGames.length;
    if (numOfRefInGames < dbGames[i].dataValues.numberOfReferees) {
      availGamesArray.push(game);
    };
    console.log('# of ref', numOfRefInGames, 'max # of ref', dbGames[i].dataValues.numberOfReferees);
    console.log(availGamesArray[i].dataValues);
  };
// eslint-disable-next-line prettier/prettier
};


module.exports = {
  getAllReferees,
  getAllGames,
  getAllAvailableReferees,
  getAllAvailableGames,
  getGamesWithOpenings
};
