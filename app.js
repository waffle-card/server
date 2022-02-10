import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './routers/auth.js';
import waffleCardRouter from './routers/waffleCard.js';
import commentRouter from './routers/comment.js';
import likeRouter from './routers/like.js';
import { config } from './config.js';
import { connectDB } from './database/database.js';

const app = express();

const corsOptions = {
  origin: config.cors.allowedOrigin,
  optionSuccess: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).json({ author: '정윤호', message: 'Welcome to waffleCard!' });
});

app.use('/auth', authRouter);
app.use('/waffle-cards', waffleCardRouter);
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

connectDB().then(() => {
  console.log(`Server is started... ${new Date()}`);
  app.listen(config.port);
});
