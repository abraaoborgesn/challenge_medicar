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
  user: User;
  showPassword: boolean
  constructor(private route: Router, private authentication: AuthenticationService) {
    this.user = <User>{};
    this.showPassword = false
  }

  ngOnInit(): void {}

  handleShowPassword(): void {
    this.showPassword = !this.showPassword
  }

  handleRegister(): void {
    this.route.navigate(['register'])
  }

  handleLogin(): void {
    this.authentication.login(this.user).subscribe((token) => {
      console.log(token)
      // console.log(this.authentication.user)
      // console.log(this.authentication.token)
      this.authentication.user = this.user
      this.route.navigate(['home'])
      console.log(this.authentication.user)

    })
  }

}
