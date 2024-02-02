export interface Categories {
  id: string,
  title: string,
  description: string,
}
export type CategoriesWithoutId = Omit<Categories, 'id'>;