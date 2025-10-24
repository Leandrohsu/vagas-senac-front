import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  KEYCLOAK_URL = 'http://localhost:6969/realms/pm03/protocol/openid-connect/token';

  constructor() { }

  logar(login: Login): Observable<string> {
  return this.http.post<any>('http://localhost:8080/api/keycloak/login', login).pipe(
    map(response => response.access_token)
  );
}

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  removerTokenManualmente() {
    localStorage.removeItem('token');
    Swal.fire({
       icon: "info",
       title: "Você foi deslogado!",
       text: "Sua sessão foi encerrada ou expirada, logue novamente para aproveitar o site",
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasRole(role: string) {
  const decoded = this.jwtDecode() as any;
  
  console.log('JWT completo:', decoded); // ✅ Olha tudo
  console.log('Procurando role:', role);
  console.log('realm_access:', decoded.realm_access);
  console.log('resource_access:', decoded.resource_access);
  
  const realmRoles = decoded.realm_access?.roles || [];
  const clientRoles = decoded.resource_access?.keycloakAPI?.roles || [];
  
  console.log('Realm roles:', realmRoles);
  console.log('Client roles:', clientRoles);
  
  return realmRoles.includes(role) || clientRoles.includes(role);
}

  getUsuarioLogado() {
  const decoded = this.jwtDecode() as any;
  
  // O Keycloak coloca o username em 'preferred_username'
  return {
    username: decoded.preferred_username || decoded.name || 'Usuário',
    email: decoded.email,
    // Adiciona outras propriedades se precisar
  };
}
}