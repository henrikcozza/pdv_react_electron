var Sequelize = require('sequelize');
var sequelize = new Sequelize('bdgt', 'celv', 'celv', {
    dialect: 'sqlite',
    storage: 'celv.db',
});

var Cliente = sequelize.define('Cliente', {
    name: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
    return Cliente.create({
        name: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
}).then(function(jane) {
    console.log(jane.get({
        plain: true
    }));
});
