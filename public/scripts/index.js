// Client facing scripts here

//addClickHandlers: get the title of the book from the HTML object
//make a get request with the title in the URL
//render the page on the server side

const addClickHandlers = () => {
  $(".card").click(function () {
    const title = $(this).children().children(".bookTitle").html();
    $.ajax({
      method: "GET",
      url: `/pages/${title}`,
    }).done((response) => {
      renderStories(response);
    });
  });
};

//renderStories: takes in stories as a parameter which is data from
//from the database. For each story this function creates HTML markup
//and appeneds it to the body of the document.

const renderStories = (stories) => {
  stories.forEach((item) => {
    const markup = `
     <div class='card'>
      <div class='container'>
        <div class='stamp'>
        </div>
        <span class='bookTitle'>${item.title}</span>
      </div>
      <div class='likes'>122</div>
   </div>
    `;
    $("body").append(markup);
  });
  addClickHandlers();
};

//getStories: make database call to get all the stories from the database

const getStories = () => {
  $.ajax({
    method: "GET",
    url: "/api/stories",
  }).done((response) => {
    renderStories(response);
  });
};

getStories();
