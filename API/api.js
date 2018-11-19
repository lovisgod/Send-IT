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
