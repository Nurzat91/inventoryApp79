import express from 'express';
import categoriesRouter from "./routers/categories";
import fileDb from './fileDb';
import placesRouter from "./routers/places";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);


const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};
void run();