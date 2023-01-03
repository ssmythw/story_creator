// Client facing scripts here

// make AJAX request to sever
// server is going to get the data
// return the data back here

const renderStories = (stories) => {
  stories.forEach((item) => {
    const markup = `
     <div class='card'>
      <div class='container'>
        <div class='stamp'>
        </div>
        ${item.title}
      </div>
      <div class='likes'>122</div>
   </div>

    `;
    $("body").append(markup);
  });
};

const getStories = () => {
  $.ajax({
    method: "GET",
    url: "/api/stories",
  }).done((response) => {
    renderStories(response);
  });
};

getStories();
