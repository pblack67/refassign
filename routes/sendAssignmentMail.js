const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async function sendAssignmentMail(referee, game) {
  if (process.env.EMAIL_USER) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let assignmentText = `Congratulations ${referee.firstName}! 
      
    You've been assigned a new ${game.sportName} game.
    
    Time: ${game.gameTime}
    Place: ${game.schoolName}
    
    Good luck! And may the calls be with you.
    
    The Referee Assignor`;

    let assignmentHTML = `Congratulations ${referee.firstName}!<br>
    <br>  
    You've been assigned a new ${game.sportName} game.<br>
    <br>
    Time: ${game.gameTime}<br>
    Place: ${game.schoolName}<br>
    <br>
    Good luck! And may the calls be with you.<br>
    <br>
    The Referee Assignor`;

    let info = await transporter.sendMail({
      from: '"Referee Assigner" <refassign312@gmail.com',
      to: referee.email,
      subject: "Game Assignment",
      text: assignmentText,
      html: assignmentHTML
    });

    console.log("Message sent: %s", info.messageId);
  }
};
