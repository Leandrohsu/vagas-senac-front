import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empregador } from '../../../models/empregador';
import { EmpregadorService } from '../../../services/empregador.service';
import { Endereco } from '../../../models/endereco';
import { Usuario } from '../../auth/usuario';

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
  enderecoTemp = new Endereco();


constructor(){
  let id = this.rotaAtivida.snapshot.params['id'];
  if(id){
    this.findById(id);
  }else{
      //NOVO USUÁRIO
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
    // UPDATE
    this.empregadoService
      .update(this.empregador, this.empregador.id)
      .subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/empregador']);
        },
        error: (erro) => {
          alert(erro.error);
        },
      });
  } else {
    this.empregador.enderecos = [];
    this.incluirEndereco(true);
    console.log(this.empregador);
    // SAVE
    this.empregadoService.save(this.empregador).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.roteador.navigate(['vagas']);
      },
      error: (erro) => {
        alert(erro.error);
      },
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
