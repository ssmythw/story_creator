-- Drop and recreate Users table

DROP TABLE IF EXISTS contributions_likes CASCADE;
CREATE TABLE contributions_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id),
  contribution_id INT REFERENCES contributions(id)
);
