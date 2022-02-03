import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './routers/auth.js';
import waffleCardRouter from './routers/waffleCard.js';
import commentRouter from './routers/comment.js';
import likeRouter from './routers/like.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to waffleCard!' });
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

app.listen(8080);
