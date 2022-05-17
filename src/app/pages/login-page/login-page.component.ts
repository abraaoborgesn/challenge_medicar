import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.authentication.tokenExists() // não deixar voltar para página de login se tiver com o token no localStorage
  }

}
