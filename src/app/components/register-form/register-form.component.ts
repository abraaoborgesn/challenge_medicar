import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  showPassword: boolean;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.showPassword = false;

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {}

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  handleCreate(): void {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        this.authService.showMessage(
          'As senhas não são iguais. Tente novamente!',
          true
        );
        return;
      }
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.authService.showMessage('Cadastro realizado com sucesso!');
        this.router.navigate(['']);
      });
    }
  }
}
