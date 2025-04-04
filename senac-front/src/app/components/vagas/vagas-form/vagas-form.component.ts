import { Component, inject } from '@angular/core';
import { Vagas } from '../../../models/vagas';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasService } from '../../../services/vagas.service';


@Component({
  selector: 'app-vagas-form',
  standalone: true,
  imports: [],
  templateUrl: './vagas-form.component.html',
  styleUrl: './vagas-form.component.scss'
})
export class VagasFormComponent {

  vagas: Vagas = new Vagas();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  vagasService = inject(VagasService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }
  findById(id: number){

    this.vagasService.findById(id).subscribe({
      next: (vagasRetorno) => {
        this.vagas = vagasRetorno;
      },
      error: (erro) => {
        alert('Deu erro!');
      }
    });

  }

  save(){
    if(this.vagas.id > 0){
      // UPDATE
      this.vagasService.update(this.vagas, this.vagas.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/vagas']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }else{
      // SAVE
      this.vagasService.save(this.vagas).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/curso']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }
  }

}
