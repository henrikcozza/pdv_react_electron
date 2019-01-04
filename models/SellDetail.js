const Produto = require('./product')
const Venda = require('./sell')

module.exports = function(sequelize, DateTypes) {
  const vendaDetail = sequelize.define('VendaDetails', {
    quantidade: DateTypes.INTEGER,
      venda_id: DateTypes.INTEGER,
  })
  vendaDetail.hasOne(Produto(sequelize, DateTypes),{as:'Produtos', foreignKey:'produto_id'})
  vendaDetail.hasOne(Venda(sequelize, DateTypes), {foreignKey: 'venda_id', sourceKey: 'venda_id', constraints: false});

  return vendaDetail;
}
