import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { User } from '../../interfaces/user-auth';
import { MatSnackBar } from '@angular/material/snack-bar';

interface newUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly API = `${environment.apiUrl}`;

  private userData = new BehaviorSubject<string>('');
  private tokenData = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private snakBar: MatSnackBar) {}

  set userName(userName: string) {
    this.userData.next(userName);
  }
  get userName(): string {
    return this.userData.value;
  }

  set token(token: string) {
    this.tokenData.next(token);
  }
  get token(): string {
    return this.tokenData.value;
  }

  authenticate(user: User): Observable<string> {
    return this.http.post<string>(`${this.API}/users/login`, user).pipe(
      map((res: any) => {
        this.setToken(res.token);
        this.setUserName(user.username);

        return res;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  register(user: newUser): Observable<User> {
    return this.http.post<User>(`${this.API}/users`, user).pipe(
      map((res) => {
        console.log(res);
      }),
      catchError((err) => this.handleError(err))
    );
  }

  handleError(err: any): Observable<any> {
    this.showMessage('Login ou senha incorretos. Tente novamente!', true);
    return EMPTY;
  }

  showMessage(message: string, isError: boolean = false): void {
    this.snakBar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: isError ? 'error-message' : 'sucess-message',
      duration: 4000,
    });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUserName(userName: string): void {
    localStorage.setItem('userName', JSON.stringify(userName));
  }

  getUserNameAndToken(): void {
    this.userName = <string>(
      JSON.parse(<string>localStorage.getItem('userName'))
    );
    this.token = <string>localStorage.getItem('token');
  }

  userIsAuthenticated() {
    return localStorage.getItem('token') ? true : false;
  }
}
