import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CandidatoService } from '../../../services/candidato.service';
import { Candidato } from '../../../models/candidato';
import { Endereco } from '../../../models/endereco';


@Component({
  selector: 'app-candidatos-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './candidatos-form.component.html',
  styleUrl: './candidatos-form.component.scss'
})
export class CandidatosFormComponent {
  candidato: Candidato = new Candidato();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  candidatoService = inject(CandidatoService);
  enderecoTemp = new Endereco();


constructor(){
  let id = this.rotaAtivida.snapshot.params['id'];
  if(id){
    this.findById(id);
  }
}
findById(id: number){

  this.candidatoService.findById(id).subscribe({
    next: (candidatoRetorno) => {
      this.candidato = candidatoRetorno;
    },
    error: (erro) => {

      alert(erro.error);
    }
  });
}

save(){
  if(this.candidato.id > 0){
    // UPDATE
    this.candidatoService.update(this.candidato, this.candidato.id).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.roteador.navigate(['admin/candidato']);
      },
      error: (erro) => {
        alert(erro.error);
      }
    });


  }else{
    this.candidato.enderecos = [];
      this.incluirEndereco(true);
      console.log(this.candidato);
    // SAVE
    this.candidatoService.save(this.candidato).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.roteador.navigate(['admin/vagas']);
      },
      error: (erro) => {
        alert(erro.error);
      }
    });


  }
}

incluirEndereco(salvando = false){
    if(this.candidato.enderecos == null)
      this.candidato.enderecos = [];

    let endClone = Object.assign({}, this.enderecoTemp);
    this.candidato.enderecos.push(endClone);

    if(!salvando)
      this.enderecoTemp = new Endereco();
  }

  deletarEndereco(endereco: Endereco){
    let indice = this.candidato.enderecos.findIndex(x =>{return x.id == endereco.id});
    this.candidato.enderecos.splice(indice,1);

  }
inscricao(idCandidato: number, idVaga: number){
  this.candidatoService.inscricao(idCandidato, idVaga).subscribe({
    next: () => alert("Inscrição realizada com sucesso"),
    error: (erro: any) => alert(erro.error || "Erro ao realizar inscrição"),
  });
}





}
