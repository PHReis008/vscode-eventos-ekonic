import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  estaCarregando = signal(false);

  loginform = new FormGroup ({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  onSubmit() {
    this.estaCarregando.set(true)
    const {email, password} = this.loginform.getRawValue()

    this.authService.login(email!, password!).subscribe({
      next: () => {
        alert("Login efetuado com sucesso!")
        this.router.navigate(['/admin/dashboard'])
      },
      error: () => {
        this.estaCarregando.set(false);
        alert("Usuário ou senha inválidos")
        }
    });
  }

}
