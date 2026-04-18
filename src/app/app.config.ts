import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { atmReducer } from './core/store/atm/atm.reducer';
import { AtmEffects } from './core/store/atm/atm.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      atm: atmReducer
    }),
    provideEffects([AtmEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      connectInZone: true
    })
  ]
};