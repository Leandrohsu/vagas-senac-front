import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {


  http = inject(HttpClient);
  API = environment.Servidor+'/api/endereco';

  constructor() { }

  findAll(): Observable<Endereco[]>{
      return this.http.get<Endereco[]>(this.API+'/findAll');
    }
  
    findById(id: number): Observable<Endereco>{
      return this.http.get<Endereco>(this.API+'/findById/'+id)
    }
  
    deleteById(id: number): Observable<string>{
      return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
    }
  
    save(endereco: Endereco): Observable<string> {
      return this.http.post<string>(this.API+'/save', endereco, {responseType: 'text' as 'json'})
    }
  
    update(endereco: Endereco, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, endereco, {responseType: 'text' as 'json'})
    }

    findByCidade(cidade: string): Observable<Endereco[]>{
          let pars = new HttpParams()
          .set('cidade', cidade);
    
          return this.http.get<Endereco[]>(this.API+'/findByCidade',{params:pars});
    
        }

        findByEstado(estado: string): Observable<Endereco[]>{
          let pars = new HttpParams()
          .set('estado', estado);
    
          return this.http.get<Endereco[]>(this.API+'/findByEstado',{params:pars});
    
        }





}
