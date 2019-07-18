import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.gurad';
// import { IndexGuard } from './shared/index.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipeStartComponent, pathMatch: 'full' },
        { path: 'new', component: RecipeEditComponent },
        // { path: ':id', component: RecipeDetailComponent, canActivate: [IndexGuard], resolve: [RecipesResolverService] },
        // { path: ':id/edit', component: RecipeEditComponent, canActivate: [IndexGuard], resolve: [RecipesResolverService] }
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ] },
    { path: 'shopping-list', component: ShoppingListComponent, children: [
        { path: ':id', component: ShoppingEditComponent }
    ] },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
