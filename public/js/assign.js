$(function() {
  $(document).on("click", ".js-assign", function(event) {
    event.preventDefault();
    let gameid = $(this).attr("game-id");
    console.log(gameid);
    location.href = "/assign/" + gameid;
  });
});
