/* eslint-disable linebreak-style */
const joi = require('joi');


const validateparcels = (parcel) => {
  const schema = {
    Name: joi.string().min(8).max(30).required(),
    Pickup: joi.string().min(8).max(50).required(),
    Destination: joi.string().min(8).max(50).required(),
    Reciever: joi.string().min(8).max(30).required(),
    userid: joi.string().min(3).max(30).required(),
    RecieverMail: joi.string().min(8).max(30).required(),
    Weight: joi.number().required(),
    status: 'In-Transit',
  };
  return joi.validate(parcel, schema);
};

export default validateparcels;
