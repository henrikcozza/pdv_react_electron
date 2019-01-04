module.exports = function(sequelize, DateTypes) {
  return sequelize.define('Vendas', {
    data: DateTypes.STRING,
    pagto: DateTypes.BOOLEAN

  });
 }
