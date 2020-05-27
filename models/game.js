module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    metacritic: {
      type: DataTypes.INTEGER,
    },
    released: {
      type: DataTypes.STRING,
    },
    background_image: {
      type: DataTypes.TEXT,
    },
    website: {
      type: DataTypes.STRING,
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
