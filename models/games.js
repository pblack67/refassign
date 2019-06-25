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

  // Post.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };


  return Game;
};

