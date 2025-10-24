// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { KeycloakService } from 'keycloak-angular';

const keycloak = new KeycloakService();

async function bootstrap() {
  try {
    await keycloak.init({
      config: {
        url: 'http://localhost:6969',  // ✅ Porta correta
        realm: 'pm03',                 // Confirma se é esse mesmo
        clientId: 'keycloakAPI',       // Confirma se é esse mesmo
      },
      initOptions: {
        onLoad: 'check-sso',           // ✅ Não força login
        checkLoginIframe: false,       // ✅ Evita erro de iframe
        pkceMethod: 'S256',
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets'],
    });

    await bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...appConfig.providers!,
        { provide: KeycloakService, useValue: keycloak },
      ],
    });
  } catch (err) {
    console.error('Erro ao inicializar o Keycloak', err);
  }
}

bootstrap();


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));