const { insertStory, getStories } = require("./db/queries/stories");
const { insertUserStory } = require("./db/queries/user_stories");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("create");
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.cookies["user_id"];

  const newEntry = await insertStory(title, content);
  await insertUserStory(userId, newEntry);
  const stories = await getStories();

  res.render("index", { stories: stories.rows });
});

module.exports = router;
