import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { Vagas } from '../../../models/vagas';
import { VagasService } from '../../../services/vagas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VagasFormComponent } from '../vagas-form/vagas-form.component';
import { CandidatoService } from '../../../services/candidato.service';

@Component({
  selector: 'app-vagas-list',
  standalone: true,
  imports: [MdbCollapseModule,FormsModule,VagasFormComponent,MdbModalModule],
  templateUrl: './vagas-list.component.html',
  styleUrl: './vagas-list.component.scss'
})
export class VagasListComponent {

  termoBusca: string = '';
  lista: Vagas[] = [];

  vagasEdit!: Vagas;

  @ViewChild("modalVagasForm") modalVagasForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  vagasService = inject(VagasService);
  candidatoService = inject(CandidatoService);




  constructor(){
          this.findAll();
        }



findAll(){
  this.vagasService.findAll().subscribe({
    next: (listaRetornada) => {
      this.lista = listaRetornada;
    },
    error: (erro) => {
      Swal.fire({
        icon: "error",
        title: "Epa :c",
        text: "Não achamos nenhuma vaga atualmente",
      });
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
      this.vagasService.findBySalarioBetween(termo).toPromise(),
      this.vagasService.findBySetor(termo).toPromise()
  ])
  .then(([porTitulo, porSetor, porSalario]) => { //quando resolver salario, por "porSalario"
    const todas = [
      ...(porTitulo || []),
      ...(porSalario || []),
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

new(){
  this.vagasEdit = new Vagas();
  this.modalRef = this.modalService.open(this.modalVagasForm, { modalClass: 'modal-xl'});
}

edit(vagas: Vagas){
  this.vagasEdit = vagas;
  this.modalRef = this.modalService.open(this.modalVagasForm, { modalClass: 'modal-xl'});
}

meuEventoTratamento(mensagem:any){
  this.findAll();
  this.modalRef.close();
}


inscricao(vaga:Vagas){
this.candidatoService.inscricao(1,vaga.id).subscribe({
  next:mensagem=>{
    alert("sucesso na inscricao");
    this.findAll();
  },error:erro=>{
    alert("deu erro");
  }
})


}
vagaSelecionada: any = null;

mostrarModal(vaga: any) {
  this.vagaSelecionada = vaga;
}

fecharModal() {
  this.vagaSelecionada = null;
}


}




