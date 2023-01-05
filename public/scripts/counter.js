$(document).ready(function() {
  console.log('Tommy can you see me?');

  $("#story-content").on("input", function() {

    const charCount = $(this).val().length;
    const remainingChar = 200 - charCount;

    const counter = $(this).parent().find(".counter");
    counter.text(remainingChar);

    if (remainingChar < 200) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
  });


  $("#reset").on("click", function() {
    console.log('Tommy two');
    const counter = $(this).parent().parent().find(".counter");
    counter.text(200);
  });

});

