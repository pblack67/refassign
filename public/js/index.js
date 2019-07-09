$(function() {
  $("#sign-in-button").on("click", function() {
    let email = $("#login-email").val();
    let role = $("#login-role").val();
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
