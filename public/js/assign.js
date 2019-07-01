
$(function() {
  $(document).on("click", "#SOME_ID_OF_CARD", function(event) { // need some id of the thing being clicked
    event.preventDefault();
    gameCardIdNumber = this  // change to see if its the right code number .dataValues?
    console.log(gameCardIdNumber)
    let chosenGame = {
      schoolName: $("#schoolName-input").val(),
      sportName: $("#sportName-input").val(),
      gameTime: $("#gameTime-input").val(),
      numberOfReferees: $("#numberOfReferees-input").val()
    };
    console.log(newGame);
    $.post("/api/games", newGame, function(data, status) {
      console.log(data);
      console.log(status);
      location.reload();
    });
  });
});




// create an assign page with cards of each available game or a dropdown list
  // all available school will display thier info
// when a card is clicked the page will redirect towards a new page
  // the new page will have a card with all the chosen game's info:
    // schoolName, gameTime, locatation, etc.

// to get all available schools and put them into html
// create new assign html/api route
// write function for recognizing id of the clicked game card
// stick the id of the accquired page onto the end of another one and reruote page

