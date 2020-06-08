const express = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const router = express.Router();

// Import the model to use its database functions.
const db = require('../models');

// Create all our routes and set up logic within those routes where required.
router.get("/saved-games", (req, res) => {
  if (req.user) {
    db.Game.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(data => {
        const hbsObject = {
          games: data
        }
        res.render("savedGames", hbsObject);
      });
  }
  else{
    res.redirect("login")
  }
});



module.exports = router;
