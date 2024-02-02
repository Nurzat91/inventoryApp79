import {promises as fs} from 'fs';
import {Categories, CategoriesWithoutId} from "./types";
import crypto from "crypto";

const fileName = './db.json';
let dataCategories: Categories [] = [];

const fileDb = {
  async init() {
    try{
      const fileContents = await fs.readFile(fileName);
      dataCategories = JSON.parse(fileContents.toString());
    }catch (e){
      dataCategories = [];
    }
  },
  async getItems() {
    return dataCategories;
  },
  async addItem(items: CategoriesWithoutId) {
    const id = crypto.randomUUID();
    const categories = {id, ...items};
    dataCategories.push(categories);
    await this.save();

    return categories;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(dataCategories));
  },
  async deleteItem(id: string) {
    const categories = dataCategories.findIndex(item => item.id === id);
    if (categories !== -1) {
      dataCategories.splice(categories, 1);
      await this.save();
    }
  },
  async updateItem(id: string, updatedItem: CategoriesWithoutId) {
    const categories = dataCategories.findIndex(item => item.id === id);
    if (categories !== -1) {
      dataCategories[categories] = {id, ...updatedItem};
      await this.save();
    }
  }

};
export default fileDb;