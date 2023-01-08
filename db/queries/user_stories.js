const db = require("../connection");

const insertUserStory = () => {
  db.query(
    "INSERT INTO user_stories(user_id, story_id, user_role) VALUES($1, $2, $3)",
    [userId, newEntry.rows[0].id, "creator"]
  );
};

const getUserStoryByUserIdAndStoryId = (userId, story) => {
  db.query(
    "SELECT user_role FROM user_stories WHERE user_id=$1 AND story_id=$2",
    [userId, story.rows[0].id]
  );
};

module.exports = { insertUserStory, getUserStoryByUserIdAndStoryId };
