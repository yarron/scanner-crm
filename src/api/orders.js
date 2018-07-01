import { externalRequest } from './request';

const CONFIG = require('_config').app;

export const fetchTrackExternal = ({ track, id }) =>
  externalRequest(`${CONFIG.restApi}/add_track2/${track}/${id}`, {});

export const fetchOrdersExternal = () =>
  externalRequest(`${CONFIG.restApi}/get_orders_for_shipment`, {});
