import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";


export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  if (!authService.isLoggedIn() || !authService.isTokenValid()){
    await router.navigate(['/login']);
    return false
  }
  return true;
};
