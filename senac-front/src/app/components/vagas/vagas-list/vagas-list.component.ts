import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-vagas-list',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './vagas-list.component.html',
  styleUrl: './vagas-list.component.scss'
})
export class VagasListComponent {

}
