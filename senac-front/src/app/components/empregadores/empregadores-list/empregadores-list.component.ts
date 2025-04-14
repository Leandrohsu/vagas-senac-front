import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Empregador } from '../../../models/empregador';
import { EmpregadorService } from '../../../services/empregador.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ContatosFormComponent } from '../../contatos/contatos-form/contatos-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empregadores-list',
  standalone: true,
  imports: [MdbModalModule,FormsModule],
  templateUrl:'./empregadores-list.component.html',
  styleUrl: './empregadores-list.component.scss'
})
export class EmpregadoresListComponent {
  lista: Empregador[] = [];
  pesquisa: string = "";
  empregadorEdit!: Empregador;
  termoBusca: string = '';


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
        Swal.fire(erro.error);
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
            Swal.fire(erro.error);
          }
        });
        
      }
    });
      

  }

  buscarPorNome(){
    const termo = this.termoBusca.trim();
    if (!termo) {
      this.findAll();
    };
  
    Promise.all([
      this.empregadorService.findByNomeFantasia(termo).toPromise(),
      this.empregadorService.findByCnpj(termo).toPromise(),
    ])
    .then(([porCnpj, porNome]) => { //quando resolver salario, por "porSalario"
      const todas = [
        ...(porCnpj || []),
        ...(porNome || []),

      ];
      const unicas = new Map<string, Empregador>();
      todas.forEach(v => unicas.set(v.nomeFantasia + v.cnpj, v));
  
      this.lista = Array.from(unicas.values());
      console.log('Lista final:', this.lista);
    })
    .catch(error => {
      console.error('Erro na busca:', error);
      console.log('Lista final:', this.lista);
      this.lista = [];
    });
  }



}
