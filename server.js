// load .env data into process.env
require("dotenv").config();
// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
//body parser
app.use(express.urlencoded({ extended: true }));

//json parser FOR SINGLE PAGE MODEL
app.use(express.json());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/users", usersRoutes);
const db = require("./db/connection");
const {
  getContributionId,
  insertContribution,
  getContributionByStoryId,
  getUsernameForContribution,
  updateContribution,
  deleteContribution,
  insertContributionLikes,
} = require("./db/queries/contributions");
const {
  insertStory,
  getStories,
  getStoryByTitleId,
  updateStories,
} = require("./db/queries/stories");
const {
  insertUserStory,
  getUserStoryByUserIdAndStoryId,
} = require("./db/queries/user_stories");

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/contributions/:id", async (req, res) => {
  const storyId = req.params.id;
  const userId = req.cookies["user_id"];

  const contributions = await getContributionId(storyId, userId);
  res.render("contributions", { contributions: contributions.rows });
});

app.post("/contributions/:id", async (req, res) => {
  const contribution = req.body.contribution;
  const storyId = req.params.id;
  const userId = req.cookies["user_id"];

  await insertContribution(contribution, storyId, userId);

  res.redirect(`/stories/${req.body.title}`);
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.cookies["user_id"];

  const newEntry = await insertStory(title, content);
  await insertUserStory(userId, newEntry);
  const stories = await getStories();

  res.render("index", { stories: stories.rows });
});

app.get("/:id", async (req, res) => {
  res.cookie("user_id", req.params.id);
  const stories = await getStories();

  res.render("index", { stories: stories.rows });
});

app.get("/stories/:title", async (req, res) => {
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

app.post("/stories/:id", async (req, res) => {
  const completed = req.body.completed;
  const id = req.params.id;
  if (completed) {
    await updateStories(id);
  }
  res.status(201).send("Sucessfully published!");
});

app.post("/contributions/likes/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.cookies["user_id"];
  let count = parseInt(req.body.count, 0);
  count++;

  console.log("Contribution: " + id + "userId: " + userId + "count: " + count);

  await updateContribution(count, id);
  await insertContributionLikes(userId, id);

  res.status(201).send("Like success");
});

app.post("/contributions/dislikes/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.cookies["user_id"];
  let count = parseInt(req.body.count, 0);
  count--;

  console.log("Contribution: " + id + "userId: " + userId + "count: " + count);

  await updateContribution(count, id);
  await deleteContribution(userId, id);

  res.status(201).send("Dislike success");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
