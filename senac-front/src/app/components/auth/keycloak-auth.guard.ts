// Conteúdo de src/app/components/auth/keycloak-auth.guard.ts

import { Injectable, inject } from '@angular/core';
import { 
    CanActivateFn, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router 
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

// Este é o guard que verifica login e roles.
const keycloakAuthGuard: CanActivateFn = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const keycloak = inject(KeycloakService);
    const router = inject(Router);

    // 1. Verificar se o Keycloak está pronto
    if (!keycloak) {
        // Redireciona para o login se o serviço não estiver disponível
        console.error('Keycloak Service not initialized.');
        router.navigate(['/login']);
        return false;
    }

    // 2. Tenta fazer login (se já estiver logado, continua)
    const authenticated = await keycloak.isLoggedIn();

    if (!authenticated) {
        // Se não estiver autenticado, força o redirecionamento para o Keycloak
        keycloak.login({
            redirectUri: window.location.origin + state.url
        });
        return false;
    }

    // 3. Verifica as Roles (Permissões)
    const requiredRoles = route.data['roles'];
    if (!requiredRoles || requiredRoles.length === 0) {
        // Se a rota não exigir roles, o usuário logado pode acessar
        return true;
    }

    // Checa se o usuário tem *pelo menos uma* das roles necessárias
    const hasRequiredRole = requiredRoles.some((role: string) => 
        keycloak.isUserInRole(role)
    );

    if (hasRequiredRole) {
        return true;
    } else {
        // Se não tiver a role, redireciona para uma página de erro ou a principal
        console.warn('Access denied. User does not have required role:', requiredRoles);
        router.navigate(['/']); // Redireciona para a home
        return false;
    }
};

export const KeycloakAuthGuard = keycloakAuthGuard;