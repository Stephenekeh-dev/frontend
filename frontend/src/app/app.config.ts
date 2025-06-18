import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // ✅ withInterceptors!
import { JwtInterceptor } from './jwt.interceptor'; // your class-based interceptor
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ✅ Correct registration for Angular 16+
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    )
  ]
};
