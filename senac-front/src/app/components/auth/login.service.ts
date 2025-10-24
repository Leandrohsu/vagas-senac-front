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
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUsuarioLogado() {
    return this.jwtDecode() as Usuario;
  }
}