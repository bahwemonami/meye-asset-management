import { CanActivateFn } from '@angular/router';

export const languageGuard: CanActivateFn = () => {
  // Le guard vérifie simplement que la route est accessible
  // La redirection est gérée dans app.routes.ts
  return true;
};
