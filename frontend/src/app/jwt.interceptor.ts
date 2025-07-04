import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  // Avoid attaching token to login or register endpoints
  if (request.url.includes('/login') || request.url.includes('/register')) {
    console.log('Login/Register request detected — skipping token');
    return next(request);
  }

  const token = authService.getToken();

  console.log('Outgoing request to:', request.url);
  console.log('Token attached:', token);

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
};
