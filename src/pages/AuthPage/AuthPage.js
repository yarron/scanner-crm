import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchAuthRequest,
} from '_actions/auth';
import Login from './Login';

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAuthRequest,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthPage extends Component {
  render() {
    return (
      <Login {...this.props} />
    );
  }
}
