import { inject } from '@angular/core';
import { AuthManager } from './../services/auth-manager';
import { CanActivateFn, RedirectCommand, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
  const authManager = inject(AuthManager);
  const router = inject(Router);

  if (authManager.isAuthenticated()) {
    return true;
  }

  const urlTree = router.createUrlTree(['/login']);
  return new RedirectCommand(urlTree, { replaceUrl: true });
};
