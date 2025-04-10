import { Component, inject, Input } from '@angular/core';
import { Vagas } from '../../../models/vagas';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasService } from '../../../services/vagas.service';
import { FormsModule } from '@angular/forms';
import { Empregador } from '../../../models/empregador';
import Swal from 'sweetalert2';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-vagas-form',
  standalone: true,
  imports: [FormsModule,MdbModalModule],
  templateUrl: './vagas-form.component.html',
  styleUrl: './vagas-form.component.scss'
})
export class VagasFormComponent {

  @Input("vagas") vagas: Vagas = new Vagas();
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
        Swal.fire(erro.error);
      }
    });

  }

  
  vincularEmpregador(){
    //QUANDO TIVER LOGIN, VAMOS REFATORAR ESSA PARTE
    let meuEmpregador = new Empregador();
    meuEmpregador.id = 1;
    this.vagas.empregador = meuEmpregador;
  }


  save(){
    this.vincularEmpregador();
    if(this.vagas.id > 0){
      // UPDATE
      this.vagasService.update(this.vagas, this.vagas.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/vagas']);
        },
        error: (erro) => {
          Swal.fire(erro.error);
        }
      });


    }else{
      // SAVE
      this.vagasService.save(this.vagas).subscribe({
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
