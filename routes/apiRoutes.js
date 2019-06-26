const db = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(emailAddress) {
  if (process.env.EMAIL_USER) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: '"Referee Assigner" <refassign312@gmail.com',
      to: emailAddress,
      subject: "Game Assignment",
      text: "Hello world?",
      html: "<b>Hello world?</b>"
    });

    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = function(app) {
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
      referee.getGames().then(games => {
        response.json(games);
      });
    });
  });

  // Asssign referee to a game
  app.post(
    "/api/assignments/referee/:refereeid/:gameid",
    (request, response) => {
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
    }
  );

  // Get all referees for a given game
  app.get("/api/assignments/game/:id", (request, response) => {
    db.Games.findOne({
      where: { id: request.params.id }
    }).then(game => {
      game.getReferees().then(referees => {
        response.json(referees);
      });
    });
  });

  // Asssign game to a referee
  app.post("/api/assignments/game/:gameid/:refereeid", (request, response) => {
    db.Games.findOne({
      where: { id: request.params.gameid }
    }).then(game => {
      db.Referees.findOne({
        where: { id: request.params.refereeid }
      }).then(referee => {
        game.addReferee([referee]);
        response.json(true);
      });
    });
  });

  // This is for testing, nothing else. Front-end shouldn't call this...
  app.get("/api/sendmail", (request, response) => {
    sendMail("pblack67@comcast.net");
    response.end();
  });
};
