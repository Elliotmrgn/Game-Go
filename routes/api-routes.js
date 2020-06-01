// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  //Saving game to database
  app.post("/api/saveGame", async (req, res) => {
    const {
      UserId,
      name,
      gameId,
      slug,
      metacritic,
      released,
      background_image,
      website,
      description_raw,
    } = req.body;
    try {
      const addGame = await db.Game.create({
        UserId,
        name,
        gameId,
        slug,
        metacritic,
        released,
        background_image,
        website,
        description_raw,
      });
      res.json(addGame);
    } catch (err) {
      console.log("err", err);
    }
  });

  //Getting saved games
  app.get("/api/games", async (req, res) => {
    try {
      const allGames = await db.Game.findAll({});
      res.json(allGames);
    } catch (err) {
      console.log("err", err);
    }
  });

  //Getting saved game from the userid
  app.get("/api/games/:UserId", async (req, res) => {
    try {
      const singleGame = await db.Game.findAll({
        where: {
          UserId: req.params.UserId,
        },
      });
      res.json(singleGame);
    } catch (err) {
      console.log("err", err);
    }
  });

  //Finding game tag preferences for specific user
  app.get("/api/tags/:UserId", async (req, res) => {
    try {
      const userTags = await db.TagPreferences.findAll({
        where: {
          UserId: req.params.UserId,
        },
      });
      res.json(userTags);
    } catch (err) {
      console.log("err", err);
    }
  });

  //Adding user tag preferences for user
  app.post("/api/tags/", async (req, res) => {
    try {
      const {
        single_player,
        multiplayer,
        full_controller_support,
        coop,
        first_person,
        pve,
        pvp,
        UserId,
      } = req.params;
      const userTags = await db.TagPreferences.create({
        single_player,
        multiplayer,
        full_controller_support,
        coop,
        first_person,
        pve,
        pvp,
        UserId,
      });
      res.json(userTags);
    } catch (err) {
      console.log(err);
    }
  });
};
