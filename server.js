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

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/contributions/:id", async (req, res) => {
  const storyId = req.params.id;
  const contributions = await db.query(
    "SELECT * FROM contributions WHERE story_id=$1",
    [storyId]
  );
  res.render("contributions", { contributions });
});

app.get("/create", (req, res) => {
  console.log("here");
  res.render("create");
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.cookies["user_id"];
  const newEntry = await db.query(
    "INSERT INTO stories(title, content, status) VALUES($1, $2, $3) returning id",
    [title, content, "contribute"]
  );

  await db.query(
    "INSERT INTO user_stories(user_id, story_id, user_role) VALUES($1, $2, $3)",
    [userId, newEntry.rows[0].id, "creator"]
  );
  const stories = await db.query("SELECT * FROM stories");
  res.render("index", { stories: stories.rows });
});

app.get("/:id", async (req, res) => {
  res.cookie("user_id", req.params.id);
  const stories = await db.query("SELECT * FROM stories");
  res.render("index", { stories: stories.rows });
});

app.get("/stories/:title", async (req, res) => {
  const story = await db.query("SELECT * FROM stories WHERE title=$1", [
    req.params.title,
  ]);

  const role = await db.query(
    "SELECT user_role FROM user_stories WHERE user_id=$1 AND story_id=$2",
    [req.cookies["user_id"], story.rows[0].id]
  );

  const contributions = await db.query(
    "SELECT * FROM contributions WHERE story_id=$1",
    [story.rows[0].id]
  );

  const usernames = await db.query(
    "SELECT username FROM users JOIN contributions ON users.id=user_id WHERE contributions.story_id=$1",
    [story.rows[0].id]
  );

  console.log(contributions.rows);

  res.render("story", {
    story: story.rows[0],
    role: role.rows[0],
    contributions: contributions.rows,
    usernames: usernames.rows,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
