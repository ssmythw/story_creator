// Client facing scripts here

//addClickHandlers: get the title of the book from the HTML object
//make a get request with the title in the URL
//render the page on the server side.

$(".card").click(function () {
  const title = $(this).children().children(".bookTitle").html();
  window.location.href = `/stories/${title}`;
});

$(".write-button").click(function () {
  const id = $(this).attr("id");
  const title = $(this).attr("title");
  const markup = `
  <form action="/contributions/${id}" method="POST">
    <input type='hidden' name='title' value='${title}'>
    <textarea name="contribution" id="" cols="30" rows="5"></textarea>
      <div class='contribution-form'>
        <button type="submit" class="fa-solid fa-check"></button>
        <button type='button' class="revert-contribution fa-solid fa-trash"></button>
      </div>
  </form>
  `;
  $(".story-buttons").empty();
  $(".story-buttons").append(markup);
  $(".revert-contribution").click(function () {
    window.location.reload();
  });
});
