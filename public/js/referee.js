$(function() {
  $(document).on("click", "#create", function(event) {
    event.preventDefault();
    let newReferee = {
      firstName: $("#firstname-input").val(),
      lastName: $("#lastname-input").val(),
      address: $("#address-input").val(),
      city: $("#city-input").val(),
      state: $("#state-input").val(),
      zip: $("#zipcode-input").val(),
      email: $("#email-input").val()
    };
    console.log(newReferee);
    $.post("/api/referees", newReferee, function(data, status) {
      console.log(data);
      console.log(status);
      location.reload();
    });
  });
});
