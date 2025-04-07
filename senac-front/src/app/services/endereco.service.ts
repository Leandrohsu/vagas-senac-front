import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {


  http = inject(HttpClient);
  API = 'http://localhost:8080/api/endereco';

  constructor() { }







}
