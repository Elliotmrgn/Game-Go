module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metacritic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    background_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
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
