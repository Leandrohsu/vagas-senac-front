import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MenuComponent } from '../../layout/menu/menu.component';
import { Vagas } from '../../../models/vagas';
import { VagasService } from '../../../services/vagas.service';


@Component({
  selector: 'app-vagas-list',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './vagas-list.component.html',
  styleUrl: './vagas-list.component.scss'
})
export class VagasListComponent {

  lista: Vagas[] = [];

  VagasService = inject(VagasService);
        constructor(){
          this.findAll();
        }


findAll(){
  this.vagasService.findAll().subscribe({
    next: (listaRetornada) => {
      this.lista = listaRetornada;
    },
    error: (erro) => {
      alert('Deu erro!');
    }
  });

}

delete(vagas: Vagas){
  let indice = this.lista.findIndex(x => {return x.id == vagas.id});
  if(confirm('Deseja deletar?')){
    this.VagasService.deleteById(vagas.id).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.findAll();
      },
      error: (erro) => {
        alert('Deu erro!');
      }
    });
  }
}

}
