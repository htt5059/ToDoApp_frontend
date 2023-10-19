import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from 'jwt-decode';



export const authGuard: CanActivateFn = (route, state) => {
  function getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  const token = getDecodedAccessToken(localStorage.getItem('token') || "");
  
  if(token != null){
    const isAuthenticated = token.isAuthenticated || token.status=='connected' || false;
    if (isAuthenticated)
      return true;
  }
  return inject(Router).createUrlTree(['/login']);
  
};