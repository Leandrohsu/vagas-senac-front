import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);

  let loginService = inject(LoginService);
  if((state.url == "/vagas/new") && !loginService.hasRole("Empregador")){
    router.navigate(['/vagas']);

    Swal.fire({
      icon: "error",
      imageUrl: "https://i.pinimg.com/736x/55/2b/74/552b74768b0bac7e80a954ff60c918a4.jpg",
      imageWidth: 400,
      imageHeight: 500,
      imageAlt: "Custom image"
    });
    return false;
  }

  return true;
};
