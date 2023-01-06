$(document).ready(function () {
  // console.log('Tommy can you see me?');

  $(".upvote").on("click", function () {
    const css = $(this).attr("class");
    const contribution_id = $(this).attr("contributionId");
    let counter = $(this).attr("contributionCount");

    if (!counter) {
      counter = 0;
    }

    let url = '';

    if (css.includes("dislike")) {
      url = '/contributions/dislikes/' + contribution_id;
    }
    else {
      url = '/contributions/likes/' + contribution_id;
    }

    $.post(url,
      {
        count: counter,
      },
      function (data, status) {
        alert(data);
        window.location.reload();
      });

  });
});
