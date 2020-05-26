module.exports = (sequelize, DataTypes) => {
  const GenrePreferences = sequelize.define("GenrePreferences", {
    single_player: {
      type: DataTypes.BOOLEAN,
    },
    multiplayer: {
      type: DataTypes.BOOLEAN,
    },
    full_contoller_support: {
      type: DataTypes.BOOLEAN,
    },
    great_soundtrack: {
      type: DataTypes.BOOLEAN,
    },
    coop: {
      type: DataTypes.BOOLEAN,
    },
    first_person: {
      type: DataTypes.BOOLEAN,
    },
    pve: {
      type: DataTypes.BOOLEAN,
    },
    pvp: {
      type: DataTypes.BOOLEAN,
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
