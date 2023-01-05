-- DROP TABLE IF EXISTS contributions CASCADE;
-- CREATE TABLE contributions (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id INT REFERENCES users(id),
--   story_id INT REFERENCES stories(id),
--   content TEXT NOT NULL,
--   status VARCHAR(32) CHECK(status IN ('pending', 'approved')) NOT NULL,
--   likes INT NOT NULL
-- );

INSERT INTO contributions (user_id, story_id, content, status, likes)
VALUES (1, 1, 'Sed in mauris eget sem egestas aliquam. Vestibulum sapien libero, hendrerit non arcu eget, ultricies tincidunt purus. Fusce tempus molestie nisi eget ullamcorper. Nunc sagittis sapien eget ex venenatis, eu interdum nibh ullamcorper. Curabitur vestibulum tortor a purus blandit tempus. Vivamus commodo volutpat iaculis. Donec ultricies purus lacus, vitae sollicitudin odio semper nec. Aenean rutrum nisi ac urna aliquet scelerisque. Suspendisse imperdiet ligula nisl, in molestie eros suscipit vitae. Donec eget quam posuere, finibus velit in, placerat nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec condimentum pellentesque tempus. Cras vitae quam nec diam semper volutpat in eu justo. Etiam eu gravida lectus, ut interdum augue. Maecenas mauris lacus, lacinia ac dignissim eget, hendrerit ut dui. Quisque eleifend lacus et porttitor cursus.
Aenean et mi molestie, iaculis lectus id, condimentum ex.', 'approved', 130);

INSERT INTO contributions (user_id, story_id, content, status, likes)
VALUES (3, 2, 'Sed in mauris eget sem egestas aliquam. Vestibulum sapien libero, hendrerit non arcu eget, ultricies tincidunt purus. Fusce tempus molestie nisi eget ullamcorper. Nunc sagittis sapien eget ex venenatis, eu interdum nibh ullamcorper. Curabitur vestibulum tortor a purus blandit tempus. Vivamus commodo volutpat iaculis. Donec ultricies purus lacus, vitae sollicitudin odio semper nec. Aenean rutrum nisi ac urna aliquet scelerisque. Suspendisse imperdiet ligula nisl, in molestie eros suscipit vitae. Donec eget quam posuere, finibus velit in, placerat nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec condimentum pellentesque tempus. Cras vitae quam nec diam semper volutpat in eu justo. Etiam eu gravida lectus, ut interdum augue. Maecenas mauris lacus, lacinia ac dignissim eget, hendrerit ut dui. Quisque eleifend lacus et porttitor cursus.
Aenean et mi molestie, iaculis lectus id, condimentum ex.', 'pending', 90);

INSERT INTO contributions (user_id, story_id, content, status, likes)
VALUES (2, 1, 'Sed in mauris eget sem egestas aliquam. Vestibulum sapien libero, hendrerit non arcu eget, ultricies tincidunt purus. Fusce tempus molestie nisi eget ullamcorper. Nunc sagittis sapien eget ex venenatis, eu interdum nibh ullamcorper. Curabitur vestibulum tortor a purus blandit tempus. Vivamus commodo volutpat iaculis. Donec ultricies purus lacus, vitae sollicitudin odio semper nec. Aenean rutrum nisi ac urna aliquet scelerisque. Suspendisse imperdiet ligula nisl, in molestie eros suscipit vitae. Donec eget quam posuere, finibus velit in, placerat nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec condimentum pellentesque tempus. Cras vitae quam nec diam semper volutpat in eu justo. Etiam eu gravida lectus, ut interdum augue. Maecenas mauris lacus, lacinia ac dignissim eget, hendrerit ut dui. Quisque eleifend lacus et porttitor cursus.
Aenean et mi molestie, iaculis lectus id, condimentum ex. In pretium fermentum sem, et ultrices orci tristique a. Sed ut faucibus augue. Phasellus dignissim tristique ante id accumsan.', 'pending', 90)
