import express from 'express';
import router from './router/route';


const app = express();
app.use(express.json());

// eslint-disable-next-line prefer-destructuring

app.use('/api/v1/', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('listening on port 8000....... please wait');
});
// app.post('/api/v1/parcels', (req, res) => {
//   const parcel = {
//     parcelid: models.parcels.length + 1,
//     name: req.body.name,
//     reciever: req.body.reciever,
//     to: req.body.to,
//     from: req.body.from,
//     userid: req.body.userid,
//     status: req.body.status,
//   };
//   models.parcels.push(parcel);
//   res.status(200).send(parcel);
// });

// app.get('/api/v1/parcels', (req, res) => {
//   res.status(200).send(models.parcels);
// });

// app.get('/api/v1/parcels/:parcelid', (req, res) => {
//   // eslint-disable-next-line radix
//   const getparcels = models.parcels.find(c => c.parcelid === parseInt(req.params.parcelid));

//   if (!getparcels) {
//     res.status(400).send('the parcel with the giving id is not available');
//   } else {
//     res.status(200).send(getparcels);
//   }
// });

// app.get('/api/v1/users/:userid/parcels', (req, res) => {
//   const userParcels = checks.getUserParcels(req.params.userid);
//   const getuser = models.users.find(c => c.userid === req.params.userid);
//   if (!getuser) {
//     res.status(404).send('the user with that id is not available');
//   } else {
//     res.status(200).send({
//       // this send the user details as a json object
//       user: getuser,
//       parcels: userParcels,
//     });
//   }
// });

// app.put('/api/v1/parcels/:parcelid/cancel', (req, res) => {
//   // eslint-disable-next-line radix
//   const parcelToCancel = models.parcels.find(c => c.parcelid === parseInt(req.params.parcelid));
//   if (!parcelToCancel) {
//     res.status(400).send('Nothing to cancel');
//   } else {
//     if (parcelToCancel.status !== 'delivered') {
//       parcelToCancel.status = 'cancelled';
//       res.status(200).send('you have successfully cancelled the delivery order');
//     }
//     res.send({ status: 'You cant cancel an already delivered order!!!' });
//   }
// });
