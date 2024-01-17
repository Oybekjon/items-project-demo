/*
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(),
  ]
};
/*

/*
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './api/interceptors/token.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideRouter(routes),
    // Removed the duplicate provideHttpClient()
  ]
};
*/


import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './api/interceptors/token.interceptor';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { httpInterceptor } from './api/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([httpInterceptor])),
  
  ]
};
