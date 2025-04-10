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

  findByTitulo(titulo: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('titulo', titulo);
    return this.http.get<Vagas[]>(this.API+'/findByTitulo',{params:pars});
  }

  findByRequisito(requisito: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('requisito', requisito);
    return this.http.get<Vagas[]>(this.API+'/findByRequisito',{params:pars});
  }

  findBySalarioBetween(requisito: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('salario1', requisito)
    .set('salario2', requisito);
    return this.http.get<Vagas[]>(this.API+'/findBySalario',{params:pars});
  }

  findBySetor(setor: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('setor', setor);
    return this.http.get<Vagas[]>(this.API+'/findBySetor',{params:pars});
  }

  findByDataAnuncio(dataAnuncio: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('dataAnuncio', dataAnuncio);
    return this.http.get<Vagas[]>(this.API+'/findByDataAnuncio',{params:pars});
  }

  findByTipo(tipo: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('tipo', tipo);
    return this.http.get<Vagas[]>(this.API+'/findByTipo',{params:pars});
  }

  findByNivelExperiencia(nivelExperiencia: string): Observable<Vagas[]>{
    let pars = new HttpParams()
    .set('nivelExperiencia', nivelExperiencia);
    return this.http.get<Vagas[]>(this.API+'/findByNivelExperiencia',{params:pars});
  }



}
