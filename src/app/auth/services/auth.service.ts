import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  public get currentUser(): User | undefined {
    return this.user;
  }

  public login(email: string, password: string): Observable<User> {
    const userId: number = 1;
    return this.httpClient.get<User>(`${this.baseUrl}/users/${userId}`)
      .pipe(
        tap(user => this.user = { ...user }),
        tap(user => localStorage.setItem('token', `${userId}`)),
      );
  }

  public checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.httpClient.get<User>(`${this.baseUrl}/users/${token}`)
      .pipe(
        tap(user => this.user = { ...user }),
        map(user => !!user),
        catchError(error => of(false)),
      );
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
