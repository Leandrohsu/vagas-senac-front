import { Injectable, inject } from '@angular/core';
import { Empregador } from '../models/empregador';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpregadorService {

  http = inject(HttpClient);
  API = 'http://localhost:8080/api/empregador';


  findAll(): Observable<Empregador[]>{
    return this.http.get<Empregador[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Empregador>{
    return this.http.get<Empregador>(this.API+'/findById/'+id)
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
  }

  save(empregador: Empregador): Observable<string> {
    return this.http.post<string>(this.API+'/save', empregador, {responseType: 'text' as 'json'})
  }

  update(empregador: Empregador, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, empregador, {responseType: 'text' as 'json'})
  }
  findByNomeFantasia(nomeFantasia: string, ): Observable<Empregador[]> {
    let pars = new HttpParams().set('nome', nomeFantasia)
    return this.http.get<Empregador[]>(this.API + '/findByNomeFantasia');

  }

  buscarPorEmail(email: string): Observable<Empregador[]>{
    let pars = new HttpParams().set('email', email);
    return this.http.get<Empregador[]>(this.API+'/buscarPorEmail',{params:pars});

  }
}
