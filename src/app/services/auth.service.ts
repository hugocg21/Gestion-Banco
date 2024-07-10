import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/login', { username, password })
      .pipe(
        tap(response => {
          this.token = response.token;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  verifyCode(code: string): Observable<boolean> {
    return this.http.post<boolean>('/api/verify-2fa', { code });
  }
}
