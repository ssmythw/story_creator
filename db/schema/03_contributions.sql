-- Drop and recreate contributions table

DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id),
  story_id INT REFERENCES stories(id),
  content TEXT NOT NULL,
  status VARCHAR(32) CHECK(status IN ('pending', 'approved')) NOT NULL,
  likes INT NOT NULL 
);
