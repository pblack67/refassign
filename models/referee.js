module.exports = function (sequelize, DataTypes) {
    var Referee = sequelize.define("Referee", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.INTEGER
    });
    return Referee;
};