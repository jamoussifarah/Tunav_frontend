import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailjsService } from 'emailJs/email.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export interface SignUpRequest {
  nom: string;
  email: string;
  role:number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient,private emailjsService: EmailjsService,private cookieService: CookieService) {}

 signUp(data: SignUpRequest): Observable<{ message: string; mdp: string }> {
  return this.http.post<{ message: string; mdp: string }>(`${this.apiUrl}/signup`, data);
}

  signIn(data: SignInRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, data);
  }
  
  getToken(): string | null {
    return this.cookieService.get('token');
  }
  getRole(): string | null {
    return this.cookieService.get('role');
  }
  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.cookieService.delete('name');
  }
}
