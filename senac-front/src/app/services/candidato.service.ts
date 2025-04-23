import { Injectable, inject } from '@angular/core';
import { Candidato } from '../models/candidato';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

    http = inject(HttpClient);
    API = 'http://localhost:8080/api/candidato';

    constructor() { }

    findAll(): Observable<Candidato[]>{
      return this.http.get<Candidato[]>(this.API+'/findAll');
    }

    findById(id: number): Observable<Candidato>{
      return this.http.get<Candidato>(this.API+'/findById/'+id)
    }

    deleteById(id: number): Observable<string>{
      return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
    }

    save(candidato: Candidato): Observable<string> {
      return this.http.post<string>(this.API+'/save', candidato, {responseType: 'text' as 'json'})
    }

    update(candidato: Candidato, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, candidato, {responseType: 'text' as 'json'})
    }
    findByCpf(cpf: string): Observable<Candidato[]>{
      let params = new HttpParams().set('cpf', cpf);

      return this.http.get<Candidato[]>(this.API+'/findByCpfContaining',{params});
    }

  inscricao(idCandidato: number, idVaga: number) {
    const body = { idCandidato, idVaga };
    return this.http.put<string>(this.API+'/inscricao/'+idCandidato, idVaga, {responseType: 'text' as 'json'})
  }

}
