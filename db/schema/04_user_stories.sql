-- Drop and recreate user_stories table

DROP TABLE IF EXISTS user_stories CASCADE;
CREATE TABLE user_stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id),
  story_id INT REFERENCES stories(id),
  user_role VARCHAR(32) CHECK(user_role IN ('creator', 'contributor'))
);
