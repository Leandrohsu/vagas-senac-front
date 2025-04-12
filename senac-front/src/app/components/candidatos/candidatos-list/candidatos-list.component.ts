import { Component, inject } from '@angular/core';
import { Candidato } from '../../../models/candidato';
import { CandidatoService } from '../../../services/candidato.service';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-candidatos-list',
  standalone: true,
  imports: [MdbCollapseModule,FormsModule],
  templateUrl: './candidatos-list.component.html',
  styleUrl: './candidatos-list.component.scss'
})
export class CandidatosListComponent {
lista: Candidato[] = [];
  pesquisa: string = "";
  CandidatoEdit!: Candidato;
  termoBusca: string = '';




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

  buscarPorCpf() {
    const termo = this.termoBusca?.trim();
  
    if (!termo) {
      this.findAll();
      return;
    }
  
    this.candidatoService.findByCpf(termo).subscribe({
      next: (resultado) => {
        this.lista = Array.isArray(resultado) ? resultado : [resultado];
      },
      error: (error) => {
        console.error('Erro na busca:', error);
        this.lista = [];
      }
    });
  }
  
  
  }
  
