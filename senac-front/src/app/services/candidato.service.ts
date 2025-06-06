import { Injectable, inject } from '@angular/core';
import { Candidato } from '../models/candidato';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

    http = inject(HttpClient);
    API = environment.Servidor+'/api/candidato';

    constructor() { }



  findCandidatoByIdUsuario(id: number): Observable<Candidato>{
    return this.http.get<Candidato>(this.API+'/findCandidatoByIdUsuario/'+id)
  }  

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
      const params = new HttpParams()
          .set('idCandidato', idCandidato.toString())
          .set('idVaga', idVaga.toString());
      return this.http.post<string>(`${this.API}/inscricao`, null, { params, responseType: 'text' as 'json' });
  }

}
