module.exports = function(sequelize, DataTypes) {
  const Searched = sequelize.define("Search", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
  });
  return Searched;
};
