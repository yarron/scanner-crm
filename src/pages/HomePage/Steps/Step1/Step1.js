import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from './styles.scss';

@CSSModules(styles, { allowMultiple: true })
export default class Step1 extends PureComponent {
  static propTypes = {
    ordersShipment: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeCurrent: PropTypes.func.isRequired,
    changeStep: PropTypes.func.isRequired,
    orders: PropTypes.shape({
      current: PropTypes.number,
    }).isRequired,
  }

  handleChange = ({ target: { value } }) => {
    const { changeCurrent, changeStep } = this.props;

    changeCurrent(value);

    if (value) {
      changeStep(1);
    }
  };

  render() {
    const { ordersShipment, orders: { current } } = this.props;

    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <FormControl>
          <Select
            value={current}
            onChange={this.handleChange}
            displayEmpty
            name="client"
          >
            <MenuItem value={0}>
              <em>Не выбран</em>
            </MenuItem>
            {
              ordersShipment.map(order => (
                <MenuItem key={order.id} value={order.id}>
                  {order.lastname} {order.firstname}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Typography>
    );
  }
}
