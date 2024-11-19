import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: [
      'danielvillamorales@gmail.com',
      [Validators.required, Validators.email],
    ],
    password: ['Dani1995', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('Login success'), this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error', err), Swal.fire('Error', err, 'error');
      },
    });
  }
}
