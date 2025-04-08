import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CandidatoService } from '../../../services/candidato.service';
import { Candidato } from '../../../models/candidato';


@Component({
  selector: 'app-candidatos-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './candidatos-form.component.html',
  styleUrl: './candidatos-form.component.scss'
})
export class CandidatosFormComponent {
  candidato: Candidato = new Candidato();
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  candidatoService = inject(CandidatoService);


constructor(){
  let id = this.rotaAtivida.snapshot.params['id'];
  if(id){
    this.findById(id);
  }
}
findById(id: number){

  this.candidatoService.findById(id).subscribe({
    next: (candidatoRetorno) => {
      this.candidato = candidatoRetorno;
    },
    error: (erro) => {
      alert('Deu erro na  de encontrar um id em candidatoform');
    }
  });

}

save(){
  if(this.candidato.id > 0){
    // UPDATE
    this.candidatoService.update(this.candidato, this.candidato.id).subscribe({
      next: (mensagem) => {
        alert(mensagem);
        this.roteador.navigate(['admin/candidato']);
      },
      error: (erro) => {
        alert('Deu erro na hora dar update no candidatoform');
      }
    });


  }else{
    // SAVE
    this.candidatoService.save(this.candidato).subscribe({
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