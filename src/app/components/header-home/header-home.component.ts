import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  get username(): string {
    return this.authentication.userName
  }

  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    localStorage.clear();
    this.router.navigate([''])
  }
}
