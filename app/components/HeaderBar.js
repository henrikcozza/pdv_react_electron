// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderBar.css';
import routes from '../constants/routes';
import {  Layout, Icon} from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handlerRouteName } from '../actions/routeName'

const {
  Header
} = Layout;

type Props = {};

class HeaderBar extends Component<Props> {
  constructor(props: Props){
      super(props)
  }

  render() {
    const {
      routeName
    } = this.props;
    return (
        <Header style={{ background: '#fff', padding: 0 }} >
           <h2 className={styles.routeName} >{routeName}</h2>
        </Header>
    );
  }
}


function mapStateToProps(state) {
  return {
    routeName: state.routeName.routeName
  };
}


export default connect(mapStateToProps)(HeaderBar);
