import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';

import Scanner from './Scanner';
import styles from './styles.scss';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@CSSModules(styles, { allowMultiple: true })
export default class Step2 extends PureComponent {
  static propTypes = {
    orders: PropTypes.shape({
      current: PropTypes.number,
      readyStatus: PropTypes.string,
    }).isRequired,
    fetchTrackRequest: PropTypes.func.isRequired,
    changeStep: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { orders: { current, byId } } = props;
    const { track } = byId[current];

    this.state = {
      track,
      scanning: false,
      isError: !track,
    };
  }

  handleChange = ({ target: { value } }) => {
    let isError = true;
    if (value.length === 14) {
      isError = false;
    }

    if ((value.length <= 14 && value.match(/^[0-9]+$/)) || value.length === 0) {
      this.setState({
        track: value,
        isError,
        scanning: false,
      });
    } else if (value.length <= 13) {
      this.setState({
        track: value.substr(0, value.length - 1),
        isError,
      });
    }
  }

  handleScan = () => {
    this.setState({ scanning: !this.state.scanning });
  }

  handleDetected = ({ codeResult: { code } }) => {
    console.log(code);
    this.handleChange({ target: { value: code } }, true);
  }

  handleNext = () => {
    const { fetchTrackRequest, orders: { current } } = this.props;

    fetchTrackRequest(current, this.state.track);
  }

  handlePrev = () => {
    const { changeStep } = this.props;

    changeStep(0);
  }

  render() {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <div styleName="root">
          <div styleName="actions">
            <Button
              mini
              variant="fab"
              aria-label="add"
              color="secondary"
              onClick={this.handlePrev}
            >
              <Tooltip title="Предыдущий шаг"><ArrowBackIcon /></Tooltip>
            </Button>
            <Button
              disabled={this.state.isError}
              mini
              variant="fab"
              aria-label="add"
              color="secondary"
              onClick={this.handleNext}
            >
              <Tooltip title="Следуюший шаг"><ArrowForwardIcon /></Tooltip>
            </Button>
          </div>
          <div styleName="track">
            <TextField
              label="Трек-номер"
              value={this.state.track}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button mini variant="fab" aria-label="add" color="primary" onClick={this.handleScan}>
              <Tooltip title="Сканировать трек-номер"><CropFreeIcon /></Tooltip>
            </Button>
          </div>
        </div>
        <Dialog
          fullScreen
          open={this.state.scanning}
          TransitionComponent={Transition}
        >
          <AppBar styleName="appBar">
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleScan} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" styleName="flex">
                Сканирование... {this.state.track}
              </Typography>
            </Toolbar>
          </AppBar>
          {this.state.scanning && (<Scanner onDetected={this.handleDetected} />)}
        </Dialog>
      </Typography>
    );
  }
}
