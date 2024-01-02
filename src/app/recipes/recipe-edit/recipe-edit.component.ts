import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public isEditMode: boolean;
  public recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router) {}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params.id);
      this.isEditMode = params.id != null;
      this.initRecipeForm();
    });
  }

  public submitForm(): void {
    const recipe: Recipe = this.recipeForm.value;

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.onCancel();
  }

  public addIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)]),
      })
    );
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public deleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initRecipeForm(): void {
    let recipeName: string = '';
    let recipeDesc: string = '';
    let recipeImg: string = '';
    let ingredientsArray = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImg = recipe.imagePath;

      if (recipe.ingredients.length > 0) {
        for (let ingredient of recipe.ingredients) {
          ingredientsArray.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImg, Validators.required),
      ingredients: ingredientsArray,
    });
  }
}
