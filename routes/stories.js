const {
  getContributionByStoryId,
  getUsernameForContribution,
} = require("../db/queries/contributions");
const { getStoryByTitleId, updateStories } = require("../db/queries/stories");
const {
  getUserStoryByUserIdAndStoryId,
} = require("../db/queries/user_stories");

const express = require("express");
const router = express.Router();

router.get("/:title", async (req, res) => {
  const title = req.params.title;
  const userId = req.cookies["user_id"];

  const story = await getStoryByTitleId(title);
  const role = await getUserStoryByUserIdAndStoryId(userId, story);
  const contributions = await getContributionByStoryId(story);
  const usernames = await getUsernameForContribution(story);

  if (role.rowCount === 0) {
    role.rows[0] = {};
    role.rows[0].user_role = "neither";
  }

  res.render("story", {
    story: story.rows[0],
    role: role.rows[0],
    contributions: contributions.rows,
    usernames: usernames.rows,
  });
});

router.post("/:id", async (req, res) => {
  const completed = req.body.completed;
  const id = req.params.id;
  if (completed) {
    await updateStories(id);
  }
  res.status(201).send("Sucessfully published!");
});

module.exports = router;
