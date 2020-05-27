module.exports = (sequelize, DataTypes) => {
  const PlatformPreferences = sequelize.define("Preferences", {
    xbox: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    playstation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    PC: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    nintendo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  });
  PlatformPreferences.associate = (models) => {
    PlatformPreferences.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return PlatformPreferences;
};
