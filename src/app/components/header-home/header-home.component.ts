import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  get username(): string {
    return this.authentication.user.username
  }

  constructor(private route: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    localStorage.clear();
    this.route.navigate([''])
  }
}
