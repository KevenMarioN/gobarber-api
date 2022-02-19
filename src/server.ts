import express from 'express';
import appointments from './routes/appointments.routes';
import './database';
const app = express();
app.use(express.json());
app.use('/appointments', appointments);

app.listen(3333, () => {
  console.log('🚀 Server running in port 3333!');
});
