/* eslint-disable linebreak-style */
import express from 'express';
import * as controllers from '../controllers/controller';

const router = express.Router();

router.post('/auth/signup', controllers.signupuser);
// router.post('/auth/login', controllers.loginuser);
router.post('/parcels', controllers.postparcels);
router.get('/parcels', controllers.getparcels);
router.get('/parcels/:parcelid', controllers.getparcelswithid);
router.get('/users/:userid/parcels', controllers.getparcelsforuser);
router.put('/parcels/:parcelid/cancel', controllers.canceltheorder);

export default router;
