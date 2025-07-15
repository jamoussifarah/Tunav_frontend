import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/Services/auth.service';
import { EmailjsService } from 'emailJs/email.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  signUpName: string = '';
  signUpEmail: string = '';
  frontUrl=environment.frontUrl;
  signInEmail: string = '';
  signInPassword: string = '';
  constructor(private authService: AuthService,private router: Router,private emailjsService: EmailjsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('auth-box');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }

  onSignUp(): void {
    const data = {
      nom: this.signUpName,
      email: this.signUpEmail,
      role:0
    };
    
    this.authService.signUp(data).subscribe({
          next: (response) => {
          console.log('✅ Inscription réussie');
          console.log('🔐 Mot de passe généré :', response.mdp);

          const params = {
            email: data.email,
            name: data.nom, 
            password: response.mdp,
            loginLink: this.frontUrl+'/auth'
          };

          this.emailjsService.sendPasswordEmail(params);

          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie',
            text: 'Un mail contenant le mot de passe sera envoyé.'
          });
        },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Un compte avec cet email existe déjà.'
        });
        console.error(err);
      }
    });
  }

onSignIn() {
  const data = {
    email: this.signInEmail,
    password: this.signInPassword
  };

  this.authService.signIn(data).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('name', res.nom);
      localStorage.setItem('userId', res.userId);
      console.log("le resultat",localStorage.getItem('userId'));
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      localStorage.removeItem('redirectAfterLogin'); 

      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Bienvenue ${res.nom} !`,
        confirmButtonText: 'Continuer'
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.role === 'Client') {
            console.log("lien",redirectUrl);
            if (redirectUrl && (redirectUrl.includes('formulaireiotit') || redirectUrl.includes('formulairefranchise'))) {
              this.router.navigateByUrl(redirectUrl);
              console.log(redirectUrl);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.router.navigate(['/admin']);
          }
        }
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Échec de la connexion',
        text: 'Email ou mot de passe incorrect.'
      });
      console.error(err);
    }
  });
}
}
