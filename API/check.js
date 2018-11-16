import * as model from './models';


const { parcels } = model.parcels;

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
