import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user-auth';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  showPassword: boolean = false;
  createForm: FormGroup;

  constructor(
    private router: Router,
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  handleLogin(): void {
    this.authentication.authenticate(this.createForm.value).subscribe(() => {
      this.router.navigate(['home']);
    });
  }

  handleRegister(): void {
    this.router.navigate(['register']);
  }

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
