import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../admin/Services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[ReactiveFormsModule,CommonModule],
standalone:true
})
export class LoginComponent {
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
    const {userName , password}=this.LoginForm.value;

    const loginCredentials = {
      EmailOrUserName: userName,
      Password: password,
    };
    this.buttonMessage = 'Loading...';
    this.accountService.Login(loginCredentials).subscribe({
      next: (data) => {
        console.log(data);
        this.errorMessage = '';
        const decodedData = encodeURIComponent(JSON.stringify(data));
        // document.cookie = `token=${decodedData};expires=${data.expireDate}`;
        // this.accountService.IsLogged = true;
        // this.accountService.Role = data.Role;
        // this.accountService.Name = data.name;
        // this.accountService.SetToken(data.token);
        localStorage.setItem('token',data.token);
        localStorage.setItem('role',data.Role);
        localStorage.setItem('name',data.name);
        localStorage.setItem('expireDate',data.expireDate);
        this.router.navigateByUrl('/');
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.buttonMessage = 'Login';
        if (e.status == 401) {
          this.errorMessage = 'Wrong User Name Or Password';
        } else {
          this.errorMessage = 'An Error Has Occured, Try Again Later.';
        }
      },
    });
  }
}
