
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
router.put('/parcels/:parcelid/changedestination', controllers.changedestination);
router.put('/parcels/:parcelid/changestatus', controllers.changeorderstatus);

export default router;
