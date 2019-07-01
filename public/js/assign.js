$(function() {
  $(document).on("click", ".js-assign", function(event) {
    event.preventDefault();
    let gameid = $(this).attr("game-id");
    console.log(gameid);
    location.href = (`/assign/`+ gameid);
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

