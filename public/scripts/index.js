// Client facing scripts here

//addClickHandlers: get the title of the book from the HTML object
//make a get request with the title in the URL
//render the page on the server side.

$(".card").click(function () {
  const title = $(this).children().children(".bookTitle").html();
  window.location.href = `/stories/${title}`;
});
