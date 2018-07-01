import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

import * as authConst from '_constants/auth';
import styles from './styles.scss';

@CSSModules(styles, { allowMultiple: true })
export default class Login extends PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      readyStatus: PropTypes.string,
      error: PropTypes.string,
      attempt: PropTypes.number,
    }).isRequired,
    fetchAuthRequest: PropTypes.func.isRequired,
  }

  state = {
    password: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      password: value,
    });
  }

  handleAuth = () => {
    const { auth, fetchAuthRequest } = this.props;

    if (auth.readyStatus === 'DEFAULT'
      || auth.readyStatus === authConst.FETCH_AUTH_FAILURE) {
      fetchAuthRequest(this.state.password);
    }
  }

  render() {
    const {
      auth: {
        error,
        readyStatus,
        attempt,
        isAuth,
      },
    } = this.props;
    return (
      <section styleName="root">
        {isAuth && <Redirect to="/orders" />}
        <Paper styleName="paper" elevation={4}>
          <AppBar styleName="appBar">
            <Toolbar>
              <AccountCircle styleName="icon" />
              <Typography variant="title" color="inherit">
                Авторизация
              </Typography>
            </Toolbar>
          </AppBar>
          <Typography component="div" styleName="action">
            <TextField
              error={!!error}
              label="Введите пароль"
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              disabled={!attempt}
              autoFocus
              helperText={error}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {
              readyStatus === authConst.FETCH_AUTH_REQUEST && (
                <CircularProgress color="secondary" />
              )
            }
            {
              readyStatus !== authConst.FETCH_AUTH_REQUEST && !!attempt && (
                <Button
                  mini
                  variant="contained"
                  color="secondary"
                  onClick={this.handleAuth}
                  disabled={!this.state.password}
                >
                  Ок
                </Button>
              )
            }
          </Typography>
        </Paper>
      </section>
    );
  }
}
