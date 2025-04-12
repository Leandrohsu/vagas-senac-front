import { Component, inject } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-contatos-list',
  standalone: true,
  imports: [],
  templateUrl: './contatos-list.component.html',
  styleUrl: './contatos-list.component.scss'
})
export class ContatosListComponent {

  lista: Contato[] = [];
    pesquisa: string = "";
    ContatoEdit!: Contato;
    termoBusca: string = '';




    contatoService = inject(ContatoService);
    constructor(){
      this.findAll();
    }


    findAll(){

      this.contatoService.findAll().subscribe({
        next: (listaRetornada) => {
          this.lista = listaRetornada;
        },
        error: (erro) => {
          Swal.fire(erro.error);
        }
      });

    }

    delete(contato: Contato){

      Swal.fire({
        title: 'Deseja mesmo deletar?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {

          this.contatoService.deleteById(contato.id).subscribe({
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
