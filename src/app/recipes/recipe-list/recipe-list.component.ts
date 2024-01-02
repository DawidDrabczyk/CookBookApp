import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipeList: Array<Recipe>;
  public recipesChangesSub: Subscription;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipesChangesSub = this.recipesService.recipesChanges.subscribe((res: Array<Recipe>) => {
      this.recipeList = res;
    });
    this.recipeList = this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesChangesSub.unsubscribe();
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
