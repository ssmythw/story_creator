$(document).ready(function() {
  // console.log('Tommy can you see me?');

  //CHARACTER COUNTER
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


  //RESET COUNTER ON CLICK
  $("#reset").on("click", function() {
    // console.log('Tommy can you hear me?');
    const counter = $(this).parent().parent().find(".counter");
    counter.text(200);
  });


  $('.error-text').slideUp().text('');
  //ERROR HANDLING FOR TITLE TEXTAREA
  $('.new-story-form').submit(function(event) {
    // event.preventDefault(); ONLY FOR AJAX



    console.log('Hello from Title');

    const title = $(this).find("#story-title").val();
    console.log('title', title);

    if (title.length === 0) {

      event.preventDefault()
      return $('.error-text').text('Title appears to be empty!').slideDown(600);

    }
    if (title.length > 35) {
      event.preventDefault()
      return $('.error-text').text('Title cannot exceed 35 characters!').slideDown(600);
    }


    const text = $(this).find("#story-content").val();

    if (text.length === 0) {

      event.preventDefault()
      return $('.error-text').text('Story appears to be empty!').slideDown(600);

    }
    if (text.length > 35) {
      event.preventDefault()
       return $('.error-text').text('Story cannot exceed 35 characters!').slideDown(600);

    }



    //BROWSER POST SO ANYTHING GOES


  });




  // end
});

