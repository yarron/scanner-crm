import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  getOrdersShipmentSelector,
  getOrdersResultSelector,
} from '_selectors/orders';
import {
  changeStep,
  changeCurrent,
  fetchTrackRequest,
  fetchOrdersRequest,
} from '_actions/orders';

import Header from './Header';
import Steps from './Steps';
import Results from './Results';

const mapStateToProps = state => ({
  ordersShipment: getOrdersShipmentSelector(state),
  ordersResult: getOrdersResultSelector(state),
  orders: state.orders,
  isAuth: state.auth.isAuth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changeStep,
  changeCurrent,
  fetchTrackRequest,
  fetchOrdersRequest,
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
  }

  render() {
    const { isAuth } = this.props;
    return (
      <Fragment>
        {!isAuth && <Redirect to="/auth" />}
        {isAuth && (
          <Fragment>
            <Header />
            <Steps {...this.props} />
            <Results {...this.props} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
