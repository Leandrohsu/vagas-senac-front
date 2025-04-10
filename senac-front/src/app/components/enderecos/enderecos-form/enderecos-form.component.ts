import { Component, inject } from '@angular/core';
import { EnderecoService } from '../../../services/endereco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../../../models/endereco';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enderecos-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './enderecos-form.component.html',
  styleUrl: './enderecos-form.component.scss'
})
export class EnderecosFormComponent {
   endereco: Endereco = new Endereco();
    rotaAtivida = inject(ActivatedRoute);
    roteador = inject(Router);
    enderecoService = inject(EnderecoService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }
  findById(id: number){
  
    this.enderecoService.findById(id).subscribe({
      next: (enderecoRetorno) => {
        this.endereco = enderecoRetorno;
      },
      error: (erro) => {
        alert(erro.error);
      }
    });
  
  }
  
  save(){
    if(this.endereco.id > 0){
      // UPDATE
      this.enderecoService.update(this.endereco, this.endereco.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/endereco']);
        },
        error: (erro) => {
          alert(erro.error);
        }
      });
  
  
    }else{
      // SAVE
      this.enderecoService.save(this.endereco).subscribe({
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
}
