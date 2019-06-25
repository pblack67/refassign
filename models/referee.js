module.exports = function (sequelize, DataTypes) {
    var Referee = sequelize.define("Referee", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Referee.associate = function (models) {
        Referee.belongsToMany(models.Game, { through: 'assignments' }); 
    };

    return Referee;
};

// Sample distance query for Google Maps Disane Matrix API
// https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Chicago+IL&destinations=Schaumburg+IL&key=