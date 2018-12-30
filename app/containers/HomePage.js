// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerRouteName } from '../actions/routeName'


type Props = {};

class HomePage extends Component<Props> {

  constructor(props: Props){
      super(props)
      this.props.handleName('Home')
  }
  render() {
    return <Home />;
  }
}


function mapStateToProps(state) {
  return {
    routeName: state.routeName.routeName
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({handleName: handlerRouteName}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
