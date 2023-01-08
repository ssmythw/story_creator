const db = require("../connection");

const getContributionId = (userId, storyId) => {
  return db.query(
    "SELECT contributions.id as contribution_id, contributions.*  , users.*, (select id from contributions_likes where  contribution_id = contributions.id and user_id = $1  ) as haslike FROM contributions JOIN users ON contributions.user_id=users.id  WHERE story_id=$2",
    [userId, storyId]
  );
};

const getContributionByStoryId = (story) => {
  return db.query("SELECT * FROM contributions WHERE story_id=$1", [
    story.rows[0].id,
  ]);
};

const insertContribution = (contribution, storyId, userId) => {
  return db.query(
    "INSERT INTO contributions(user_id, story_id, content, status, likes) VALUES ($1, $2, $3, $4, $5)",
    [userId, storyId, contribution, "pending", 0]
  );
};

const getUsernameForContribution = (story) => {
  return db.query(
    "SELECT username FROM users JOIN contributions ON users.id=user_id WHERE contributions.story_id=$1",
    [story.rows[0].id]
  );
};

const updateContribution = (count, userId) => {
  return db.query(
    `UPDATE contributions
    SET likes = $1
    WHERE id = $2`,
    [count, userId]
  );
};

const deleteContribution = (userId, id) => {
  return db.query(
    `delete from contributions_likes where user_id = $1 and contribution_id = $2`,
    [userId, id]
  );
};

const insertContributionLikes = (userId, id) => {
  db.query(
    `INSERT INTO contributions_likes (user_id, contribution_id)
    VALUES ($1, $2)`,
    [userId, id]
  );
};

module.exports = {
  getContributionId,
  insertContribution,
  getContributionByStoryId,
  getUsernameForContribution,
  updateContribution,
  deleteContribution,
  insertContributionLikes,
};
