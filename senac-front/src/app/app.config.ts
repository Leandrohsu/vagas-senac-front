import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';

import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideAnimations(),

//     // Importante: o HttpClient deve vir antes do interceptor
//     provideHttpClient(withInterceptorsFromDi()),

//     // ✅ Inclua o KeycloakService diretamente
//     KeycloakService,

//     // ✅ Registra o interceptor que adiciona o token às requisições HTTP
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: KeycloakBearerInterceptor,
//       multi: true,
//     },
//   ],
// };






// import { APP_INITIALIZER } from '@angular/core';

// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'http://localhost:8080',
//         realm: 'meu-app',
//         clientId: 'angular-app'
//       },
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/assets/silent-check-sso.html',
//         checkLoginIframe: false
//       },
//       enableBearerInterceptor: true,
//       bearerPrefix: 'Bearer',
//       bearerExcludedUrls: ['/api/public']
//     });
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     KeycloakService,
//     {
//       provide: APP_INITIALIZER,
//       useFactory: initializeKeycloak,
//       multi: true,
//       deps: [KeycloakService]
//     }
//   ]
// };




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    
    // KeycloakService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ]
};