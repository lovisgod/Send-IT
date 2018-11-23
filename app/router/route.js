import express from 'express';
import usercontrol from '../controllers/usercontroller';
import parcelcontrol from '../controllers/controller';

const router = express.Router();

router.post('/auth/signup', usercontrol.signupuser);
router.post('/auth/login', usercontrol.loginuser);
router.post('/parcels', parcelcontrol.postparcels);
router.get('/parcels', parcelcontrol.getparcels);
router.get('/parcels/:parcelid', parcelcontrol.getparcelswithid);
router.get('/users/:userid/parcels', usercontrol.getparcelsforuser);
router.put('/parcels/:parcelid/cancel', usercontrol.canceltheorder);
router.put('/parcels/:parcelid/changedestination', usercontrol.changedestination);
router.put('/parcels/:parcelid/changestatus', parcelcontrol.changeorderstatus);
router.put('/parcels/:parcelid/presentlocation', parcelcontrol.changeorderlocation);

export default router;
