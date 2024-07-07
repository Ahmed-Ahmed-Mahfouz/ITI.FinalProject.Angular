import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccountView, LoginCredentials, LoginResponse } from '../DTOs/InsertDTOs/IAccount';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService  {
//   IsLogged = false;
//   Role: string[] = [];
//   private token = '';
//   Name = '';
//   private genericService: GenericService<IAccountView, LoginCredentials, any>;

//   constructor(private httpClient: HttpClient, private router: Router) {
//     this.genericService = new GenericService<IAccountView, LoginCredentials, any>(httpClient);
   
//   }

//   checkExistingUser(email: string): Observable<boolean> {
//     return this.httpClient.get<boolean>(`https://localhost:5241/api/User/CheckEmail/${email}`, { headers: this.genericService.headers });
//   }

//   GetToken() {
//     return this.token;
//   }

//   SetToken(newToken: string) {
//     this.token = newToken;
//   }

//   CheckRole(Role: string) {
//     return this.Role.includes(Role);
//   }

// //   Login(Credentials: LoginCredentials): Observable<LoginResponse> {
// // //     return this.httpClient.post<LoginResponse>(`http://localhost:5241/api/login
// // // `, Credentials, { headers: this.genericService.headers });

// // return this.httpClient.post<LoginResponse>(`http://localhost:5241/api/login`, Credentials);
// //   }

// Login(Credentials: LoginCredentials): Observable<string> {
//   return this.httpClient.post('https://localhost:5241/api/login', Credentials, { responseType: 'text' as 'json' }) as Observable<string>;
// }

//   LogOut() {
//     document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     this.IsLogged = false;
//     this.Role = [];
//     this.token = '';
//     this.router.navigateByUrl('/login');
//   }
IsLogged = false;
  Role: string[] = [];
  private token = '';
  Name = '';
  // private genericService: GenericService<IAccountView, LoginCredentials, any>;

   constructor( private router: Router ,private httpClient:HttpClient ,private genericService :GenericService<IAccountView, LoginCredentials, any>) { 
  // this.genericService = new GenericService<IAccountView, LoginCredentials, any>(httpClient);
  }

  // checkExistingUser(email: string): Observable<boolean> {
  //   return this.genericService.GetById(`https://localhost:5241/api/User/CheckEmail/${email}`, { headers: this.genericService.headers });
  // }

  GetToken() {
    return this.token;
  }

  SetToken(newToken: string) {
    this.token = newToken;
  }

  CheckRole(Role: string) {
    return this.Role.includes(Role);
  }

  Login(Credentials: LoginCredentials): Observable<any> {
    return this.httpClient.post<any>('https://localhost:7057/api/login' , Credentials);
    return this.genericService.Add('https://localhost:7057/api/login', Credentials);
  }

  LogOut() {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.IsLogged = false;
    this.Role = [];
    this.token = '';
    this.router.navigateByUrl('/login');
  }

}
