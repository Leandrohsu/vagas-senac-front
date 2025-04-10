import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { Vagas } from '../../../models/vagas';
import { VagasService } from '../../../services/vagas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vagas-list',
  standalone: true,
  imports: [MdbCollapseModule,FormsModule,CommonModule],
  templateUrl: './vagas-list.component.html',
  styleUrl: './vagas-list.component.scss'
})
export class VagasListComponent {

  termoBusca: string = '';
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
      Swal.fire(erro.error);
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
        Swal.fire(erro.error);
      }
    });
  }
}


buscar(){
  const termo = this.termoBusca.trim();
  if (!termo) {
    this.findAll();
  };

  Promise.all([
    this.vagasService.findByTitulo(termo).toPromise(),
      // this.vagasService.findBySalarioBetween(termo).toPromise(),
      this.vagasService.findBySetor(termo).toPromise()
  ])
  .then(([porTitulo, porSetor]) => { //quando resolver salario, por "porSalario"
    const todas = [
      ...(porTitulo || []),
      // ...(porSalario || []),
      ...(porSetor || [])
    ];
    const unicas = new Map<string, Vagas>();
    todas.forEach(v => unicas.set(v.titulo + v.descricao, v));

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




