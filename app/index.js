import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import models from '../models/index';
const store = configureStore();

console.log(models.Users)

models.sequelize.sync().then(() => {
    console.log('banco de dados carregado')
    // models.Users.bulkCreate([
    //   { firstName: 'barao', lastName:'prozoak', email:'teste@teste.com'},
    // ]).then(
    //     models.Products.bulkCreate([
    //         { name: 'vela de 7 dias', price:'10.00'},
    //     ]).then(
    // models.Users.findAll().then(person => {
    //     if(person){
    //
    //         console.log(JSON.stringify(person))
    //
    //         person[0].firstName = 'jane'
    //         console.log(person[0].firstName) // 'jane'
    //         person[0].reload().then(() => {
    //             console.log(person[0].firstName) // 'john'
    //         })
    //         if (person[0].firstName != 'Palhaco'){
    //             person[0].update({
    //                 firstName: 'Palhaco'
    //             }).then(
    //                 console.log('atualizado')
    //             )
    //         }
    //     }
    // })
    //
    //     )
    //
    // )
})





render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
