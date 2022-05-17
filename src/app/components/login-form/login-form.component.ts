import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user-auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  user: User = <User>{}
  showPassword: boolean = false

  constructor(private route: Router, private authentication: AuthenticationService) {
  }

  ngOnInit(): void {}

  handleLogin(): void {
    this.authentication.authenticate(this.user).subscribe(() => {
      this.route.navigate(['home'])
    })
  }

  handleRegister(): void {
    this.route.navigate(['register'])
  }

  handleShowPassword(): void {
    this.showPassword = !this.showPassword
  }
}
