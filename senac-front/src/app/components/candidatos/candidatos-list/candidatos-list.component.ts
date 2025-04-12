import { Component, inject } from '@angular/core';
import { Candidato } from '../../../models/candidato';
import { CandidatoService } from '../../../services/candidato.service';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';



@Component({
  selector: 'app-candidatos-list',
  standalone: true,
  imports: [],
  templateUrl: './candidatos-list.component.html',
  styleUrl: './candidatos-list.component.scss'
})
export class CandidatosListComponent {
lista: Candidato[] = [];
  pesquisa: string = "";
  CandidatoEdit!: Candidato;

  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois


  candidatoService = inject(CandidatoService);
  constructor(){
    this.findAll();
  }


  findAll(){

    this.candidatoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error);
      }
    });

  }

  delete(candidato: Candidato){

    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.candidatoService.deleteById(candidato.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error);
          }
        });

      }
    });


  }

}
