import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../admin/Services/account.service';
import { CommonModule } from '@angular/common';
import { LoginCredentials } from '../../../../admin/DTOs/InsertDTOs/IAccount';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[ReactiveFormsModule,CommonModule],
standalone:true
})
export class LoginComponent {
  // buttonMessage = 'Login';
  // LoginForm: FormGroup;
  // errorMessage = '';


  // constructor(private accountService: AccountService, private router: Router) {
  //   this.LoginForm = new FormGroup({
  //     userName: new FormControl('', [Validators.required]),
  //     password: new FormControl('', [Validators.required]),
  //   });
  // }

  // LoginSubmitHandler() {
  //   const {userName , password}=this.LoginForm.value;

  //   const loginCredentials = {
  //     EmailOrUserName: userName,
  //     Password: password,
  //   };
  //   this.buttonMessage = 'Loading...';
  //   this.accountService.Login(loginCredentials).subscribe({
  //     next: (data) => {
  //       console.log("This data return from login"+data);
  //       this.errorMessage = '';
  //       const decodedData = encodeURIComponent(JSON.stringify(data));
  //       localStorage.setItem('token',data.token);
  //       localStorage.setItem('role',data.Role);
  //       localStorage.setItem('name',data.name);
  //       localStorage.setItem('expireDate',data.expireDate);
  //       this.router.navigateByUrl('/');
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       console.log(e);
  //       this.buttonMessage = 'Login';
  //       if (e.status == 401) {
  //         this.errorMessage = 'Wrong User Name Or Password';
  //       } else {
  //         this.errorMessage = 'An Error Has Occured, Try Again Later.';
  //       }
  //     },
  //   });
  // }




//   LoginSubmitHandler() {
//     const { userName, password } = this.LoginForm.value;
  
//     const loginCredentials = {
//       emailOrUserName: userName,
//       password: password,
//     };
  
//     this.buttonMessage = 'Loading...';
  
//     this.accountService.Login(loginCredentials).subscribe({
//       next: (token: string) => {
//         console.log(token);
//         this.errorMessage = '';
  
//         const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', decodedToken['https://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
//         localStorage.setItem('name', decodedToken['https://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
//         localStorage.setItem('expireDate', decodedToken['ExpireDate']);
  
//         this.router.navigateByUrl('/');
//       },
//       error: (e: HttpErrorResponse) => {
//         console.log(e);
//         this.buttonMessage = 'Login';
//         if (e.status === 401) {
//           this.errorMessage = 'Wrong User Name Or Password';
//         } else {
//           this.errorMessage = 'An Error Has Occurred, Try Again Later.';
//         }
//       },
//     });
//   }
// }


buttonMessage = 'Login';
  LoginForm: FormGroup;
  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router) {
    this.LoginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  LoginSubmitHandler() {
    const { userName, password } = this.LoginForm.value;
    const loginCredentials: LoginCredentials = {
      emailOrUserName: userName,
      password: password,
    };
    this.buttonMessage = 'Loading...';
    this.accountService.Login(loginCredentials).subscribe({
      next: (data) => {
        console.log(data);
       // this.errorMessage = '';
         localStorage.setItem('token', data.token);
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('role', data.Role);
        // localStorage.setItem('name', data.name);
        // localStorage.setItem('expireDate', data.expireDate);
        this.router.navigateByUrl('/');
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.buttonMessage = 'Login';
        if (e.status == 401) {
          this.errorMessage = 'Wrong User Name Or Password';
        } else {
          this.errorMessage = 'An Error Has Occurred, Try Again Later.';
        }
      },
    });
  }
}