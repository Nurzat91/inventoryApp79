import express from 'express';
import categoriesRouter from "./routers/categories";
import fileDb from './fileDb';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);


const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};
void run();