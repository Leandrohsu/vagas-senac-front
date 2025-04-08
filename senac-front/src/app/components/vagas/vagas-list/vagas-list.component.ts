import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { Vagas } from '../../../models/vagas';
import { VagasService } from '../../../services/vagas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vagas-list',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './vagas-list.component.html',
  styleUrl: './vagas-list.component.scss'
})
export class VagasListComponent {

  lista: Vagas[] = [];

  vagasService = inject(VagasService);
        constructor(){
          this.findAll();
        }


findAll(){
  this.vagasService.findAll().subscribe({
    next: (listaRetornada) => {
      this.lista = listaRetornada;
    },
    error: (erro) => {
      Swal.fire(erro.error, 'Deu erro ao tentar encontrar tudo em vagaslist', 'error');
    }
  });

}

delete(vagas: Vagas) {
  if (confirm('Deseja deletar?')) {
    this.vagasService.deleteById(vagas.id).subscribe({
      next: (mensagem: string) => {
        alert(mensagem);
        this.findAll();
      },
      error: (erro: any) => {
        Swal.fire(erro.error, 'Deu erro ao tentar deletar em vagaslist', 'error');
      }
    });
  }
}

}
