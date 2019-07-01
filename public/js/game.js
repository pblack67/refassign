// create function to populate game on game page
$(function() {
  $(document).on("click", "#create", function(event) {
    event.preventDefault();
    let newGame = {
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