module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      // Giving the Author model a name of type STRING
      title: DataTypes.STRING
    });

    return Game;
  };
  