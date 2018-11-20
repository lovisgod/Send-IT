/* eslint-disable linebreak-style */
import * as model from './models';

const { parcels } = model.parcels;

const getUserParcels = (userId) => {
  const getid = parcels.filter(c => c.userid === userId);
  if (!getid) {
    return 'no parcels for user';
  }
  return getid;
};
export default getUserParcels;
