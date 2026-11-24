import { inject } from '@angular/core';
import { AuthManager } from './../services/auth-manager';
import { CanMatchFn, RedirectCommand, Router } from "@angular/router";

export const authGuard: CanMatchFn = () => {
  const authManager = inject(AuthManager);
  const router = inject(Router);

  if (authManager.isAuthenticated()) {
    return true;
  }

  const urlTree = router.createUrlTree(['/login']);
  return new RedirectCommand(urlTree, { replaceUrl: true });
};
