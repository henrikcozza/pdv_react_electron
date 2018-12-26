
module.exports = function(sequelize, DateTypes) {
  return sequelize.define('Users', {
    firstName: DateTypes.STRING,
    lastName: DateTypes.STRING,
    email: {
        type: DateTypes.STRING,
        allowNull: false,
        unique: true,
        validade: {
            isEmail: true
        }
    }
  });
 }
