
const joi = require('joi');


export const validateparcels = (parcel) => {
  const schema = {
    Name: joi.string().min(8).max(255).required(),
    Pickup: joi.string().min(8).max(255).required(),
    Destination: joi.string().min(8).max(255).required(),
    Reciever: joi.string().min(8).max(255).required(),
    userid: joi.string().min(3).max(255).required(),
    RecieverMail: joi.string().min(8).max(255).required(),
    Weight: joi.number().required(),
    status: 'Transit',
  };
  return joi.validate(parcel, schema);
};

export const validateuser = (user) => {
  const schema = {
    FirstName: joi.string().min(8).max(15).required(),
    LastName: joi.string().min(8).max(15).required(),
    userid: joi.string().min(8).max(15).required(),
    password: joi.string().required(),
  };
  return joi.validate(user, schema);
};
