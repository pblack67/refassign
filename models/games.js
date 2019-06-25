module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numOfRef: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Game.associate = function (models) {
    Game.belongsToMany(models.Referee, { through: 'assignments' });
  };

  return Game;
};

