import { Component } from '@angular/core';
import { FormControl, FormGroup, MinValidator, Validators,ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-representative-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './representative-form.component.html',
  styleUrls:[
    './representative-form.component.css'
  ]
})
export class RepresentativeFormComponent {
 representative = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(8)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]),
    branch: new FormControl('', [Validators.required]),
    governorate: new FormControl([], [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.maxLength(11),Validators.minLength(11)]),
    address: new FormControl('', [Validators.required]),
    discountType: new FormControl('', [Validators.required]),
    companyPercentage: new FormControl(0, [Validators.required]),
  })

  get getName()
  {
    return this.representative.controls['name'];
  }
  get getEmail()
  {
    return this.representative.controls['email'];
  }
  get getPassword()
  {
    return this.representative.controls['password'];
  }
  get getBranch()
  {
    return this.representative.controls['branch'];
  }
  get getGovernorate()
  {
    return this.representative.controls['governorate'];
  }
  get getPhone()
  {
    return this.representative.controls['phone'];
  }
  get getAddress()
  {
    return this.representative.controls['address'];
  }
  get getDiscount()
  {
    return this.representative.controls['discountType'];
  }
  get getCompanyPercentage()
  {
    return this.representative.controls['companyPercentage'];
  }

  onSubmit(){

    // e.preventDefault();
    console.log(this.representative.value)
    return false;
  }


}
