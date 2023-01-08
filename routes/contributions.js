const {
  getContributionId,
  insertContribution,
  updateContribution,
  deleteContribution,
  insertContributionLikes,
} = require("./db/queries/contributions");

const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const storyId = req.params.id;
  const userId = req.cookies["user_id"];

  const contributions = await getContributionId(storyId, userId);
  res.render("contributions", { contributions: contributions.rows });
});

router.post("/:id", async (req, res) => {
  const contribution = req.body.contribution;
  const storyId = req.params.id;
  const userId = req.cookies["user_id"];

  await insertContribution(contribution, storyId, userId);

  res.redirect(`/stories/${req.body.title}`);
});

router.post("/likes/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.cookies["user_id"];
  let count = parseInt(req.body.count, 0);
  count++;

  console.log("Contribution: " + id + "userId: " + userId + "count: " + count);

  await updateContribution(count, id);
  await insertContributionLikes(userId, id);

  res.status(201).send("Like success");
});

router.post("/dislikes/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.cookies["user_id"];
  let count = parseInt(req.body.count, 0);
  count--;

  console.log("Contribution: " + id + "userId: " + userId + "count: " + count);

  await updateContribution(count, id);
  await deleteContribution(userId, id);

  res.status(201).send("Dislike success");
});

module.exports = router;
