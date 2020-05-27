module.exports = (sequelize, DataTypes) => {
  const TagPreferences = sequelize.define("TagPreferences", {
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
  TagPreferences.associate = (models) => {
    TagPreferences.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return TagPreferences;
};
