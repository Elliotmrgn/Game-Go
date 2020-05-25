module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });
  return Game;
};
