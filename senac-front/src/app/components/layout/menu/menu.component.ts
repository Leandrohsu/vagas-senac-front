import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule,MdbDropdownModule,MdbModalModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

    @ViewChild('modalEscolha') modalEscolha!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois

  abrirmodal() {
    this.modalRef = this.modalService.open(this.modalEscolha, {
        modalClass: 'modal-dialog-centered'
      })
  }

  meuEventoTratamento() {
    this.modalRef.close();
  }
}
