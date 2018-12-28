
module.exports = function(sequelize, DateTypes) {
  return sequelize.define('Products', {
    name: DateTypes.STRING,
    price: DateTypes.STRING,
    min_stock: DateTypes.INTEGER,
    stock: DateTypes.INTEGER
  });
 }
