import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Empregador } from '../../../models/empregador';
import { EmpregadorService } from '../../../services/empregador.service';

@Component({
  selector: 'app-empregadores-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empregadores-form.component.html',
  styleUrl: './empregadores-form.component.scss'
})
export class EmpregadoresFormComponent {
 empregador: Empregador = new Empregador();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  empregadoService = inject(EmpregadorService);


constructor(){
  let id = this.rotaAtivida.snapshot.params['id'];
  if(id){
    this.findById(id);
  }
}
findById(id: number){

  this.empregadoService.findById(id).subscribe({
    next: (empregadoRetorno) => {
      this.empregador = empregadoRetorno;
    },
    error: (erro) => {
      alert(erro.error);
    }
  });

}

save(){
  if(this.empregador.id > 0){
    // UPDATE
    this.empregadoService.update(this.empregador, this.empregador.id).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.roteador.navigate(['admin/empregador']);
      },
      error: (erro) => {
        alert(erro.error);
      }
    });


  }else{
    // SAVE
    this.empregadoService.save(this.empregador).subscribe({
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
