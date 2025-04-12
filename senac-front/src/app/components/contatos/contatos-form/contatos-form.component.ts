import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contatos-form',
  standalone: true,
  imports: [],
  templateUrl: './contatos-form.component.html',
  styleUrl: './contatos-form.component.scss'
})
export class ContatosFormComponent {
   contato: Contato = new Contato();
      rotaAtivida = inject(ActivatedRoute);
      roteador = inject(Router);
      contatoService = inject(ContatoService);

    constructor(){
      let id = this.rotaAtivida.snapshot.params['id'];
      if(id){
        this.findById(id);
      }
      let email = this.rotaAtivida.snapshot.params['email'];
      if(email){
        this.findByEmail(email);
      }
    }
    findById(id: number){

      this.contatoService.findById(id).subscribe({
        next: (contatoRetorno) => {
          this.contato = contatoRetorno;
        },
        error: (erro) => {
          alert(erro.error);
        }
      });

    }
    findByEmail(email: string){

      this.contatoService.findByEmail(email).subscribe({
        next: (contatoRetorno) => {
          this.contato.email = contatoRetorno.length > 0 ? contatoRetorno[0].email : '';
        },
        error: (erro) => {
          alert(erro.error);
        }
      });
    }

    save(){
      if(this.contato.id > 0){
        // UPDATE
        this.contatoService.update(this.contato, this.contato.id).subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.roteador.navigate(['admin/contato']);
          },
          error: (erro) => {
            alert(erro.error);
          }
        });


      }else{
        // SAVE
        this.contatoService.save(this.contato).subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.roteador.navigate(['admin/contato']);
          },
          error: (erro) => {
            alert(erro.error);
          }
        });


      }
    }

}
