INSERT INTO games (name, slug, description, metacritic, released, background_image, website, gameId, UserId) VALUES ('Test Game','test-game','This is test game 1',88,'2020-12-20','https://images.unsplash.com/photo-1535443274868-756b0f070b6e?ixlib=rb-1.2.1&w=1000&q=80','www.google.com',1234,1);
INSERT INTO games (name, slug, description, metacritic, released, background_image, website, gameId,UserId) VALUES ('Test Game 2','test-game-2','This is test game 2',50,'2020-06-20','https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','www.reddit.com',7756,1);
INSERT INTO games (name, slug, description, metacritic, released, background_image, website, gameId,UserId) VALUES ('Test Game 3','test-game-3','This is test game 3',50,'2015-11-12','https://i.pinimg.com/474x/11/36/9a/11369abd38b7ea46ccbcd429be21b400.jpg','www.wunderground.com',8763,1)


/*This is to update our users table Manually*/
ALTER TABLE users
ADD column firstName VARCHAR(30) AFTER password,
ADD column lastName VARCHAR(30) AFTER firstName,
ADD column about VARCHAR(500) AFTER lastName