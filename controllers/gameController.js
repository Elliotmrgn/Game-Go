const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
const db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/test", (req, res) => {
  db.game.findAll({})(data => {
    const hbsObject = { games: data };
    console.log(hbsObject);
    //res.render("index", hbsObject);
  });
});

