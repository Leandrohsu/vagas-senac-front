import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

   http = inject(HttpClient);
   API = environment.Servidor+'/api/contato';
   
  

  constructor() { }

findAll(): Observable<Contato[]>{
      return this.http.get<Contato[]>(this.API+'/findAll');
    }

    findById(id: number): Observable<Contato>{
      return this.http.get<Contato>(this.API+'/findById/'+id)
    }

    deleteById(id: number): Observable<string>{
      return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
    }

    save(contato: Contato): Observable<string> {
      return this.http.post<string>(this.API+'/save', contato, {responseType: 'text' as 'json'})
    }

    update(contato: Contato, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, contato, {responseType: 'text' as 'json'})
    }

    findByEmail(email: string): Observable<Contato[]>{
          let pars = new HttpParams()
          .set('email', email);
    
          return this.http.get<Contato[]>(this.API+'/findByEmail',{params:pars});
    
        }


}
