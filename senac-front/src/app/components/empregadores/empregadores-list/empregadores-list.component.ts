import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Empregador } from '../../../models/empregador';
import { EmpregadorService } from '../../../services/empregador.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ContatosFormComponent } from '../../contatos/contatos-form/contatos-form.component';

@Component({
  selector: 'app-empregadores-list',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './empregadores-list.component.html',
  styleUrl: './empregadores-list.component.scss'
})
export class EmpregadoresListComponent {
  lista: Empregador[] = [];
  pesquisa: string = "";
  empregadorEdit!: Empregador;

  @ViewChild("modalAlunoForm") modalContatosForm!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois


  empregadorService = inject(EmpregadorService);
  constructor(){
    this.findAll();
  }


  findAll(){

    this.empregadorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, 'Deu erro ao encontrar tudo em empregadorlist', 'error');
      }
    });
  
  }

  delete(empregador: Empregador){

    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.empregadorService.deleteById(empregador.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, 'Deu erro ao tentar deletar em empregadorlist', 'error');
          }
        });
        
      }
    });
      

  }

}
