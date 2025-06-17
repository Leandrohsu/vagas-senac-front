import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmpregadorService } from '../../../services/empregador.service';
import { CandidatoService } from '../../../services/candidato.service';
import { VagasService } from '../../../services/vagas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards = [
    { title: 'Total de Vagas Abertas', value: 0, icon: 'fas fa-poll-h' },
    { title: 'Total de Candidatos', value: 0, icon: 'fa-user' },
    { title: 'Total de Empregadores', value: 0, icon: 'fa-users' },
  ];

  constructor(
    private vagaService: VagasService,
    private candidatoService: CandidatoService,
    private empregadorService: EmpregadorService
  ) {}

  ngOnInit(): void {
    this.vagaService.findAll().subscribe(vagas => {
      this.cards[0].value = vagas.length;
    });

    this.candidatoService.findAll(1).subscribe(candidatos => {
      this.cards[1].value = candidatos.content.length;
    });

    this.empregadorService.findAll().subscribe(empregadores => {
      this.cards[2].value = empregadores.length;
    });
  }
}
