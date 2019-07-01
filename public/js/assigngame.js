$(function() {
  $(document).on("click", ".js-assign", function(event) {
    event.preventDefault();
    let refereeid = $(this).attr("referee-id");
    let gameid = $(this).attr("game-id");
    console.log(gameid);
    $.post(`/api/assignments/referee/${refereeid}/${gameid}`, function(
      data,
      status
    ) {
      location.reload();
    });
  });

  $(document).on("click", ".js-unassign", function(event) {
    event.preventDefault();
    let refereeid = $(this).attr("referee-id");
    let gameid = $(this).attr("game-id");
    $.ajax({
      type: "DELETE",
      url: `/api/assignments/referee/${refereeid}/${gameid}`,
      success: function() {
        location.reload();
      }
    });
  });
});
