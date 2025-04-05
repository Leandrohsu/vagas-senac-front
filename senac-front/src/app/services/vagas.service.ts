import { Vagas } from './../models/vagas';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/vagas';

  constructor() { }

  findAll(): Observable<Vagas[]>{
    return this.http.get<Vagas[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Vagas>{
    return this.http.get<Vagas>(this.API+'/findById/'+id)
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
  }

  save(vagas: Vagas): Observable<string> {
    return this.http.post<string>(this.API+'/save', vagas, {responseType: 'text' as 'json'})
  }

  update(vagas: Vagas, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, vagas, {responseType: 'text' as 'json'})
  }
  buscarPorNome(nome: string): Observable<Vagas[]>{
    let pars = new HttpParams().set('nome', nome);
    return this.http.get<Vagas[]>(this.API+'/buscarPorNome',{params:pars});

  }

}
