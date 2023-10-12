import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('access_tokens')
  if (!isAuthenticated)
    return inject(Router).createUrlTree(['/login']);
    // return false;

  return true;
};