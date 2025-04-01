import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import { Login } from '../../../models/login';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);

  logar(){
    if(this.login.username == 'admin' && this.login.password == 'admin'){
      this.router.navigate(['admin/vagas']);
    }else{
      Swal.fire({
        icon: "error",
        title: "Epa",
        text: "C digitou o user ou senha errado animal"
      });
    }
  }
}
