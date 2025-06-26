import express from 'express';
import morgan from 'morgan';
import UserRoute from './routes/user.routes.js';
import BookRoute from './routes/book.routes.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/books', BookRoute);

app.get('/check', (req, res) => {
  res.send('working');
});

app.use(globalErrorHandler);
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });



export default app;
