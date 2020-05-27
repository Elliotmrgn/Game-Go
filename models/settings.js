module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
  });

  Settings.associate = (models) => {
    Settings.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Settings;
};
