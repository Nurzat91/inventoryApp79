import {Router} from 'express';
import fileDb from "../fileDb";
import {CategoriesWithoutId} from "../types";
import {filesUpload} from "../multer";

const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res) => {
  const categories = await fileDb.getItems();
  res.send(categories);
});

categoriesRouter.get('/:id', async (req, res) => {
  const categories = await fileDb.getItems();
  const categoriesId = req.params.id;
  const category = categories.find(p => p.id === categoriesId);

  if (!category) {
    return res.status(404).json({ error: `Product with ID ${categoriesId} not found` });
  }

  res.send(category);
});

categoriesRouter.post('/', filesUpload.single('dataSet'), async (req, res) => {
  const categories: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.file ? req.file.fieldname : null,
  };

  const newCategories = await fileDb.addItem(categories);
  res.send(newCategories);
});

categoriesRouter.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  await fileDb.deleteItem(categoryId);
  res.send(categoryId);
});

categoriesRouter.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const updatedCategory: CategoriesWithoutId = {
    title: req.body.title,
    description: req.body.description,
    dataSet: req.body.dataSet,
  };

  await fileDb.updateItem(categoryId, updatedCategory);
  res.send(updatedCategory);
});

export default categoriesRouter;