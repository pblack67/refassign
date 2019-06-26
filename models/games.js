module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sportName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gameTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numberOfReferees: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Games.associate = models => {
    Games.belongsToMany(models.Referees, { through: "assignments" });
  };

  return Games;
};
