import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { User } from '../interfaces/user-auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


interface newUser {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API = `${environment.apiUrl}/users`;

  private userData = new BehaviorSubject<User>({ username:'' })
  private tokenData = new BehaviorSubject<string>('')

  constructor(
    private http: HttpClient,
    private snakBar: MatSnackBar,
    private route: Router
  ) { }

  set user(user: User) {
    this.userData.next(user);
  }
  get user(): User {
    return this.userData.value
  }

  set token(token: string) {
    this.tokenData.next(token)
  }
  get token(): string {
    return this.tokenData.value
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.API}/login`, user).pipe(
      map((res: any) => {
        this.setToken(res.token);
        this.setUser(user);


        return res
    }),
    catchError((e) => this.handleError(e)))
  }

  register(user: newUser): Observable<User> {
    return this.http.post<User>(`${this.API}/`, user).pipe(
      map(e => e),
      catchError((err) => this.handleError(err))
    )
  }

  handleError(e: any): Observable<any> {

    this.showMessage('Verifique as informações e tente novamente!', true);
    return EMPTY
  }

  showMessage(message: string, isError: boolean = false): void {
    this.snakBar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: isError ? 'error-message' : 'sucess-message',
      duration: 2000,
    })
  }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  tokenExists(): void {
    this.token = <string>localStorage.getItem('token');

    this.token ? this.route.navigate(['home']) : this.route.navigate([''])
    // console.log(this.user)
    let user = <string>localStorage.getItem('user');
    this.user = <User>JSON.parse(user)
  }

  // showTokenUser(): void {
  //   console.log(this.user)
  //   console.log(this.token)
  //   console.log(this.userData.value)
  // }


}


