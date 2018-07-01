import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import ReplayIcon from '@material-ui/icons/Replay';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import {
  FETCH_TRACK_REQUEST,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
} from '_constants/orders';

import styles from './styles.scss';

@CSSModules(styles, { allowMultiple: true })
export default class Step3 extends PureComponent {
  static propTypes = {
    changeStep: PropTypes.func.isRequired,
    changeCurrent: PropTypes.func.isRequired,
    orders: PropTypes.shape({
      readyStatus: PropTypes.string,
      current: PropTypes.number,
      byId: PropTypes.object,
    }).isRequired,
  }

  handlePrev = () => {
    const { changeStep } = this.props;

    changeStep(1);
  }

  handleToStart = () => {
    const { changeStep, changeCurrent } = this.props;

    changeStep(0);
    changeCurrent(0);
  }

  render() {
    const { orders: { readyStatus, current, byId } } = this.props;
    const order = byId[current];

    return (
      <Typography component="div">
        <div styleName="root">
          {
            readyStatus === FETCH_TRACK_FAILURE && (
              <Button
                mini
                variant="fab"
                aria-label="add"
                color="secondary"
                onClick={this.handlePrev}
              >
                <ArrowBackIcon />
              </Button>
            )
          }
          {
            (readyStatus === FETCH_TRACK_SUCCESS || readyStatus === 'FETCH_ORDERS_SUCCESS') && (
              <Fragment>
                {
                  !!order && !!order.success && (
                    <div styleName="alert">
                      <CheckIcon style={{ fontSize: 70, color: '#64DD17' }} />
                      <span>{order.success}</span>
                    </div>
                  )
                }
                {
                  !!order && !!order.error && (
                    <div styleName="alert">
                      <WarningIcon style={{ fontSize: 70, color: '#D50000' }} />
                      <span>{order.error}</span>
                    </div>
                  )
                }
                <Tooltip title="Следуюший заказ">
                  <Button
                    mini
                    variant="fab"
                    aria-label="add"
                    color="secondary"
                    onClick={this.handleToStart}
                  >
                    <ReplayIcon />
                  </Button>
                </Tooltip>
              </Fragment>
            )
          }
          {
            readyStatus === FETCH_TRACK_REQUEST && (
              <CircularProgress color="secondary" />
            )
          }
        </div>
      </Typography>
    );
  }
}
