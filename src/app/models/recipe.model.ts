import { Ingredient } from './ingredient.model';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Array<Ingredient>;
}
