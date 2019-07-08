$(function() {
  $("#sign-in").on("click", function() {
    let email = $("#email").val();
    let role = $("#element2").val();
    let formObject = {
      email,
      role
    };
    $.post("/login/userdata", formObject, function(data, status) {
      if (role.toLowerCase() === "referee") {
        location.href = "/referee/games";
      } else {
        location.href = "/referee";
      }
    });
  });
});
