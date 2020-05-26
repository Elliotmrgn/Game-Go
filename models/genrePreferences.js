module.exports = (sequelize, DataTypes) => {
  const GenrePreferences = sequelize.define("GenrePreferences", {
    single_player: {
      type: DataTypes.BOOLEEN,
    },
    multiplayer: {
      type: DataTypes.BOOLEEN,
    },
    full_contoller_support: {
      type: DataTypes.BOOLEEN,
    },
    great_soundtrack: {
      type: DataTypes.BOOLEEN,
    },
    coop: {
      type: DataTypes.BOOLEEN,
    },
    first_person: {
      type: DataTypes.BOOLEEN,
    },
    pve: {
      type: DataTypes.BOOLEEN,
    },
    pvp: {
      type: DataTypes.BOOLEEN,
    },
  });
  GenrePreferences.associate = (models) => {
    GenrePreferences.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return GenrePreferences;
};
