import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAdminService {
  http = inject(HttpClient);
  
  KEYCLOAK_URL = 'http://localhost:6969';
  REALM = 'pm03';
  CLIENT_ID = 'admin-cli';
  CLIENT_SECRET = 'NChR53bnbpxJEfxmTWpKB1pHN8pTyDz0'; // Cola o secret que copiou

  // Pega token admin
  getAdminToken(): Observable<string> {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET
    });

    return this.http.post<any>(
      `${this.KEYCLOAK_URL}/realms/${this.REALM}/protocol/openid-connect/token`,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(
      map(response => response.access_token)
    );
  }

  // Cria usuário no Keycloak
  createUser(username: string, email: string, password: string): Observable<any> {
    return this.getAdminToken().pipe(
      mergeMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        const userPayload = {
          username: username,
          email: email,
          enabled: true,
          emailVerified: true,
          credentials: [{
            type: 'password',
            value: password,
            temporary: false
          }]
        };

        return this.http.post(
          `${this.KEYCLOAK_URL}/admin/realms/${this.REALM}/users`,
          userPayload,
          { headers }
        );
      })
    );
  }
}