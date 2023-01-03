// Client facing scripts here

// make AJAX request to sever
// server is going to get the data
// return the data back here

const renderStories = (stories) => {
  stories.forEach((item) => {
    const markup = `
    <div class='card'>
    ${item.title}
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
