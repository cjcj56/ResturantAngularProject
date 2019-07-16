import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipesService } from '../recipes/recipes.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor(private recipesService: RecipesService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const indexParamName = 'id';
    const index = next.params[indexParamName];
    if (index < this.recipesService.getRecipes().length) {
      return true;
    } else {
      this.router.navigate(['/recipes']);
      return false;
    }
  }
}
