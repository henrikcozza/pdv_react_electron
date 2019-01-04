'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/config_db.json');
const remote = require('electron').remote;

let app = remote.getGlobal('app')

config.db.storage = path.join(app.getPath('userData'), config.db.storage);
console.log(config.db.storage)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config.db);
}

let models = {};

const db = (function () {
  if (Object.keys(models).length) {
    return models;
  }

  let modules = [
    require('./user'),
    require('./product'),
    require('./sell'),
    require('./SellDetail'),
  ];

  modules.forEach((module) => {
    const model = module(sequelize, Sequelize);
    models[model.name] = model;
    console.log(`modelo ${model.name} carregado`)
  });

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  return models;
})();

export default db;
