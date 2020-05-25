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

  Game.associate = (models) => {
    Game.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Game;
};
