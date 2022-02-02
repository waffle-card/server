import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to waffleCard!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res) => {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(8080);
