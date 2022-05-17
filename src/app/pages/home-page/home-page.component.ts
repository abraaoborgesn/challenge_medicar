import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentCreateComponent } from 'src/app/components/appointment-create/appointment-create.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // username!: string
  constructor( private router: Router, private authentication: AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authentication.tokenExists()
    // this.authentication.showTokenUser()
  }


  handleCreateDialog(): void {
    this.dialog.open(AppointmentCreateComponent)
  }

}
