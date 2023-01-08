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

const { getStories } = require("./db/queries/stories");

const usersRoutes = require("./routes/users");
const createRoutes = require("./routes/create");
const storyRoutes = require("./routes/stories");
const contributionsRoutes = require("./routes/contributions");

//Route Prefixes

app.use("/users", usersRoutes);
app.use("/create", createRoutes);
app.use("/contributions", contributionsRoutes);
app.use("/stories", storyRoutes);

//Routes

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/create", createRoutes);
app.post("/create", createRoutes);
app.get("/contributions/:id", contributionsRoutes);
app.post("/contributions/:id", contributionsRoutes);
app.get("/stories/:title", storyRoutes);
app.post("/stories/:id", storyRoutes);
app.post("/contributions/likes/:id", contributionsRoutes);
app.post("/contributions/dislikes/:id", contributionsRoutes);
app.get("/users/:id", async (req, res) => {
  console.log(req.params.id);
  res.cookie("user_id", req.params.id);
  const stories = await getStories();
  res.render("index", { stories: stories.rows });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
