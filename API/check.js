import * as model from './models';

// eslint-disable-next-line prefer-destructuring
const parcels = model.parcels;

// eslint-disable-next-line import/prefer-default-export
export const getUserParcels = (userId) => {
  const getid = parcels.filter(c => c.userid === userId);
  if (!getid) {
    return 'no parcels for user';
  }
  return getid;
};

export const checkdelivered = () => {
  const getstatus = parcels.filter(c => c.status === 'delivered');
  if (!getstatus) {
    return 0;
  }
  return getstatus.length;
};
