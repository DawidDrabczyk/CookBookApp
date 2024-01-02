import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  public recipesChanges = new Subject<Array<Recipe>>();

  private recipeList: Array<Recipe> = [
    // {
    //   name: 'Nazwa',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ex iste sit sapiente deserunt necessitatibus repudiandae nihil impedit, odio minus.',
    //   imagePath:
    //     'https://www.southernliving.com/thmb/HSEUOjJVCl4kIRJRMAZ1eblQlWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg',
    //   ingredients: [
    //     {
    //       name: 'Jerzyny',
    //       amount: 5,
    //     },
    //     {
    //       name: 'Buraki',
    //       amount: 15,
    //     },
    //   ],
    // },
    // {
    //   name: 'Nazwa222',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ex iste sit sapiente deserunt necessitatibus repudiandae nihil impedit, odio minus.',
    //   imagePath:
    //     'https://www.southernliving.com/thmb/HSEUOjJVCl4kIRJRMAZ1eblQlWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg',
    //   ingredients: [
    //     {
    //       name: 'Kalafior',
    //       amount: 55,
    //     },
    //     {
    //       name: 'Pomarańcze',
    //       amount: 25,
    //     },
    //   ],
    // },
  ];

  constructor() {}

  public getRecipes(): Array<Recipe> {
    return this.recipeList.slice();
  }

  public getRecipeById(id: number): Recipe {
    return this.recipeList[id];
  }

  public addRecipe(recipe: Recipe): void {
    this.recipeList.push(recipe);
    this.recipesChanges.next(this.recipeList.slice());
  }

  public updateRecipe(index: number, recipe: Recipe): void {
    this.recipeList[index] = recipe;
    this.recipesChanges.next(this.recipeList.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipeList.splice(index, 1);
    this.recipesChanges.next(this.recipeList.slice());
  }
}
