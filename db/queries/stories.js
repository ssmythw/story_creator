const db = require("../connection");

const insertStory = (title, content) => {
  db.query(
    "INSERT INTO stories(title, content, status) VALUES($1, $2, $3) returning id",
    [title, content, "contribute"]
  );
};

const getStories = () => {
  db.query("SELECT * FROM stories");
};

const getStoryByTitleId = (title) => {
  db.query("SELECT * FROM stories WHERE title=$1", [title]);
};

const updateStories = (id) => {
  db.query(
    `UPDATE stories
     SET status = 'completed'
    WHERE id=${id}`
  );
};

module.exports = { insertStory, getStories, getStoryByTitleId, updateStories };
