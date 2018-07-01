import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';

import styles from './styles.scss';

@CSSModules(styles, { allowMultiple: true })
export default class Steps extends PureComponent {
  static propTypes = {
    ordersResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { ordersResult } = this.props;

    return (
      <Paper styleName="root">
        <Table styleName="table">
          <TableHead styleName="head">
            <TableRow styleName="row">
              <TableCell>Клиент</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              ordersResult.map(order => (
                <TableRow styleName="row" key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.lastname} {order.firstname}
                  </TableCell>
                  <TableCell>
                    {
                      !!order.error && (
                        <WarningIcon style={{ fontSize: 30, color: '#D50000' }} />
                      )
                    }
                    {
                      !!order.success && (
                        <CheckIcon style={{ fontSize: 30, color: '#64DD17' }} />
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
