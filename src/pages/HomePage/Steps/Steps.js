import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class Steps extends PureComponent {
  static propTypes = {
    orders: PropTypes.shape({
      step: PropTypes.number,
    }).isRequired,
    changeStep: PropTypes.func.isRequired,
    fetchOrdersRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchOrdersRequest();
  }

  handleChange = (event, value) => {
    const { changeStep } = this.props;

    changeStep(value);
  };

  render() {
    const { orders: { step } } = this.props;

    return (
      <Paper styleName="root" elevation={4}>
        <Stepper activeStep={step} orientation="vertical">
          <Step>
            <StepLabel>Выбор клиента</StepLabel>
            <StepContent>
              <Step1 {...this.props} />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Ввод трек-номера</StepLabel>
            <StepContent>
              <Step2 {...this.props} />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Статус</StepLabel>
            <StepContent>
              <Step3 {...this.props} />
            </StepContent>
          </Step>
        </Stepper>
      </Paper>
    );
  }
}
