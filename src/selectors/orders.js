import { createSelector } from 'reselect';

const sortOrders = (a, b) => {
  if (a.date > b.date) {
    return 1;
  }

  if (a.date < b.date) {
    return -1;
  }

  return 0;
};

const getOrders = ({ orders }) => orders;

export const getOrdersResultSelector = createSelector(
  [getOrders],
  orders => orders.allIds
    .map(id => orders.byId[id])
    .sort(sortOrders),
);

export const getOrdersShipmentSelector = createSelector(
  [getOrders],
  orders => orders.allIds
    .map(id => orders.byId[id])
    .filter(item => !item.complete),
);
