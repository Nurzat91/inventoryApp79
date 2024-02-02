import {Router} from 'express';
import fileDb from "../fileDb";
import {CategoriesWithoutId} from "../types";
import {filesUpload} from "../multer";

const placesRouter = Router();

placesRouter.get('/', async (req, res) => {
  const places = await fileDb.getItems();
  res.send(places);
});

placesRouter.get('/:id', async (req, res) => {
  const places = await fileDb.getItems();
  const placesId = req.params.id;
  const place = places.find(p => p.id === placesId);

  if (!place) {
    return res.status(404).json({ error: `Product with ID ${placesId} not found` });
  }

  res.send(place);
});

placesRouter.post('/', filesUpload.single('dataSet'), async (req, res) => {
  const places: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.file ? req.file.filename : null,
  };

  const newPlaces = await fileDb.addItem(places);
  res.send(newPlaces);
});

placesRouter.delete('/:id', async (req, res) => {
  const placeId = req.params.id;
  await fileDb.deleteItem(placeId);
  res.send(placeId);
});

placesRouter.put('/:id', async (req, res) => {
  const placeId = req.params.id;
  const updatedPlaces: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.body.dataSet,
  };

  await fileDb.updateItem(placeId, updatedPlaces);
  res.send(updatedPlaces);
});

export default placesRouter;
