// PG database client/connection setup
const { Pool } = require("pg");

const dbParams = {
  user: "scott",
  password: "123",
  host: "localhost",
  database: "creator_stories",
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
