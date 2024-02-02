export interface Categories {
  id: string,
  title: string,
  description: string,
  dataSet: string | null,
}
export type CategoriesWithoutId = Omit<Categories, 'id'>;

