import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const url = state.url;
  const router = inject(Router);
  localStorage.setItem('lastPath', url);
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
