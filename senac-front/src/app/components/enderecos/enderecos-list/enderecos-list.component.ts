import { Component, inject } from '@angular/core';
import { Endereco } from '../../../models/endereco';
import { EnderecoService } from '../../../services/endereco.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-enderecos-list',
  standalone: true,
  imports: [],
  templateUrl: './enderecos-list.component.html',
  styleUrl: './enderecos-list.component.scss'
})
export class EnderecosListComponent {

  lista: Endereco[] = [];
    pesquisa: string = "";
    EnderecoEdit!: Endereco;
    termoBusca: string = '';
    enderecoService = inject(EnderecoService);
    constructor(){
      this.findAll();
    }
    findAll(){
      this.enderecoService.findAll().subscribe({
        next: (listaRetornada: Endereco[]) => {
          this.lista = listaRetornada;
        },
        error: (erro: any) => {
          Swal.fire(erro.error);
        }
      });
    }

    delete(endereco: Endereco){

      Swal.fire({
        title: 'Deseja mesmo deletar?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {

          this.enderecoService.deleteById(endereco.id).subscribe({
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

    findByCidade() {
      const termo = this.termoBusca?.trim();

      if (!termo) {
        this.findByCidade();
        return;
      }

      this.enderecoService.findByCidade(termo).subscribe({
        next: (resultado) => {
          this.lista = Array.isArray(resultado) ? resultado : [resultado];
        },
        error: (erro) => {
          console.error('Erro na busca:', erro);
          this.lista = [];
        }
      });
    }
    findByEstado() {
      const termo = this.termoBusca?.trim();

      if (!termo) {
        this.findByEstado();
        return;
      }

      this.enderecoService.findByEstado(termo).subscribe({
        next: (resultado) => {
          this.lista = Array.isArray(resultado) ? resultado : [resultado];
        },
        error: (erro) => {
          console.error('Erro na busca:', erro);
          this.lista = [];
        }
      });
    }
  }



