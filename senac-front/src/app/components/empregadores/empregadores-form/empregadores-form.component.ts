import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empregador } from '../../../models/empregador';
import { EmpregadorService } from '../../../services/empregador.service';
import { KeycloakAdminService } from '../../../services/keycloak-admin.service'; // ✅ Importa
import { Endereco } from '../../../models/endereco';
import { Usuario } from '../../auth/usuario';
import { forkJoin } from 'rxjs'; // ✅ Importa
import { HttpClient } from '@angular/common/http'; // ✅ Importa

@Component({
  selector: 'app-empregadores-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empregadores-form.component.html',
  styleUrl: './empregadores-form.component.scss'
})
export class EmpregadoresFormComponent {
  empregador: Empregador = new Empregador();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  empregadoService = inject(EmpregadorService);
  keycloakAdmin = inject(KeycloakAdminService); // ✅ Injeta o service
  http = inject(HttpClient); // ✅ Injeta o HttpClient
  enderecoTemp = new Endereco();

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }else{
      let userVazio = new Usuario();
      this.empregador.usuario = userVazio;
      this.empregador.usuario.role = 'Empregador';
    }
  }

  findById(id: number){
    this.empregadoService.findById(id).subscribe({
      next: (empregadoRetorno) => {
        this.empregador = empregadoRetorno;
      },
      error: (erro) => {
        alert(erro.error);
      }
    });
  }

  save() {
  if (this.empregador.id > 0) {
    // UPDATE...
  } else {
    this.empregador.enderecos = [];
    this.incluirEndereco(true);

    // Primeiro cria no Keycloak via backend
    const keycloakData = {
      username: this.empregador.usuario.username,
      email: this.empregador.usuario.username + "@tempmail.com", // ✅ ADICIONA ESSA LINHA
      password: this.empregador.usuario.password
    };

    this.http.post('http://localhost:8080/api/keycloak/create-user', keycloakData).subscribe({
      next: () => {
        // Depois salva o empregador
        this.empregadoService.save(this.empregador).subscribe({
          next: (mensagem) => {
            alert('Cadastro realizado com sucesso!');
            this.roteador.navigate(['vagas']);
          },
          error: (erro) => alert(erro.error)
        });
      },
      error: (erro) => alert('Erro ao criar usuário: ' + erro.message)
    });
  }
}

  incluirEndereco(salvando = false){
    if(this.empregador.enderecos == null)
      this.empregador.enderecos = [];

    let endClone = Object.assign({}, this.enderecoTemp);
    this.empregador.enderecos.push(endClone);

    if(!salvando)
      this.enderecoTemp = new Endereco();
  }

  deletarEndereco(endereco: Endereco){
    let indice = this.empregador.enderecos.findIndex(x =>{return x.id == endereco.id});
    this.empregador.enderecos.splice(indice,1);
  }
}