import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';
import { IAccountView, LoginCredentials, LoginResponse } from '../DTOs/InsertDTOs/IAccount';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  IsLogged = false;
  Role: string[] = [];
  private token = '';
  Name = '';
  // APIURL = environment.APIURL;
  private genericService: GenericService<IAccountView, LoginCredentials, any, number>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.genericService = new GenericService<IAccountView, LoginCredentials, any, number>(httpClient);
    // this.genericService.baseUrl = `login`;
    
    // let tokenString = decodeURIComponent(document.cookie).split('token=')[1];
    // if (!tokenString) {
    //   return;
    // }
    // const token = JSON.parse(tokenString) as LoginResponse;
    // if (token) {
    //   console.log(token);
    //   this.IsLogged = true;
    //   this.Role = token.Role;
    //   this.token = token.token;
    //   this.Name = token.name;
    // }
  }

  checkExistingUser(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:5241/api/User/CheckEmail/${email}`, { headers: this.genericService.headers });
  }

  GetToken() {
    return this.token;
  }

  SetToken(newToken: string) {
    this.token = newToken;
  }

  CheckRole(Role: string) {
    return this.Role.includes(Role);
  }

  Login(Credentials: LoginCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`http://localhost:5241/api/Login`, Credentials, { headers: this.genericService.headers });
  }

  LogOut() {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.IsLogged = false;
    this.Role = [];
    this.token = '';
    this.router.navigateByUrl('/login');
  }
}
