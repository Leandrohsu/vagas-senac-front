import { KeycloakService } from 'keycloak-angular';
import { KeycloakInitOptions } from 'keycloak-js'; // Importação do tipo base para clareza

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> =>
    keycloak.init({
      config: {
        // ATENÇÃO: Altere ESTES campos para os valores CORRETOS
        url: 'http://localhost:8080', // Sua URL
        realm: 'pm03',              // Seu Realm
        clientId: 'keycloakAPI'       // Seu Client ID
      },
      initOptions: {
        onLoad: 'login-required', 
        checkLoginIframe: false,
        // CORREÇÃO: Usando 'as any' para forçar o tipo e resolver o erro de compilação
        silentCheckSso: true as any, 
        
        // NECESSÁRIO para segurança moderna
        pkceMethod: 'S256' as any,
      } as KeycloakInitOptions, // Assegura que o objeto completo é do tipo esperado
      bearerExcludedUrls: ['/assets'] 
    });
}