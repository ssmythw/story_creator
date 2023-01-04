-- CREATE TABLE user_stories (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id INT REFERENCES users(id),
--   story_id INT REFERENCES stories(id),
--   user_role VARCHAR(32) CHECK(user_role IN ('creator', 'contributor'))
-- );

INSERT INTO user_stories (user_id, story_id, user_role)
VALUES (1, 2, 'creator');


INSERT INTO user_stories (user_id, story_id, user_role)
VALUES (2, 2, 'contributor');