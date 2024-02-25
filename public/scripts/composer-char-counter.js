$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    let charsLeft = 140 - $(this).val().length;
    $(".counter").text(charsLeft);
    if (charsLeft < 0) {
      $(".counter").addClass("exceed-limit");
    } else {
      $(".counter").removeClass("exceed-limit");
    }
  });
});
