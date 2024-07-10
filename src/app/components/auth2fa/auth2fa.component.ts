import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-2fa',
  templateUrl: './auth2fa.component.html',
  styleUrls: ['./auth2fa.component.css']
})
export class Auth2FAComponent {
  code: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  verifyCode() {
    this.authService.verifyCode(this.code).subscribe(
      valid => {
        if (valid) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Incorrect code';
        }
      },
      error => {
        this.errorMessage = 'Error verifying the code';
      }
    );
  }
}
