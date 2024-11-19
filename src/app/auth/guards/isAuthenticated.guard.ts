import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const url = state.url;
  const router = inject(Router);
  localStorage.setItem('lastPath', url);
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  router.navigate(['/auth']);
  return false;
};
