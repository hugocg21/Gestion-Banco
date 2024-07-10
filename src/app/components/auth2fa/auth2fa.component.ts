import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-2fa',
  templateUrl: './auth2fa.component.html',
  styleUrls: ['./auth2fa.component.css']
})
export class Auth2FAComponent {
  codigo: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  verificarCodigo() {
    this.authService.verificarCodigo(this.codigo).subscribe(
      valid => {
        if (valid) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Código incorrecto';
        }
      },
      error => {
        this.errorMessage = 'Error verificando el código';
      }
    );
  }
}
