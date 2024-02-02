import {Router} from 'express';
import fileDb from "../fileDb";
import {CategoriesWithoutId} from "../types";
import {filesUpload} from "../multer";

const itemsRouter = Router();

itemsRouter.get('/', async (req, res) => {
  const items = await fileDb.getItems();
  res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
  const items = await fileDb.getItems();
  const itemsId = req.params.id;
  const item = items.find(p => p.id === itemsId);

  if (!item) {
    return res.status(404).json({ error: `Product with ID ${itemsId} not found` });
  }

  res.send(item);
});

itemsRouter.post('/', filesUpload.single('dataSet'), async (req, res) => {
  const items: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.file ? req.file.filename : null,
  };

  const newItems = await fileDb.addItem(items);
  res.send(newItems);
});

itemsRouter.delete('/:id', async (req, res) => {
  const itemsId = req.params.id;
  await fileDb.deleteItem(itemsId);
  res.send(itemsId);
});

itemsRouter.put('/:id', async (req, res) => {
  const itemsId = req.params.id;
  const updatedItems: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.body.dataSet,
  };

  await fileDb.updateItem(itemsId, updatedItems);
  res.send(updatedItems);
});

export default itemsRouter;