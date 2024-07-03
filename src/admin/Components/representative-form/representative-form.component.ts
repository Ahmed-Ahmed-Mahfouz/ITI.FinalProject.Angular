import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinValidator, Validators,ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-representative-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './representative-form.component.html',
  styleUrls:[
    './representative-form.component.css'
  ]
})
export class RepresentativeFormComponent implements OnInit {

  branches=[{id:1,name:"b1"},{id:2,name:"b2"},{id:3,name:"b3"}]
  governorates= [{id:1,name:"Menofia"},{id:2,name:"Cairo"},{id:3,name:"Alex"}]
  selectedGovernorate:number[]=[]


 representative = new FormGroup({
    userFullName: new FormControl('', [Validators.required,Validators.minLength(8)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]),
    userBranchId: new FormControl(0, [Validators.required]),
    governorateIds: new FormControl(this.selectedGovernorate, [Validators.required]),
    userPhoneNo: new FormControl('', [Validators.required,Validators.maxLength(11),Validators.minLength(11)]),
    userAddress: new FormControl('', [Validators.required]),
    discountType: new FormControl(0, [Validators.required]),
    companyPercentage: new FormControl(0, [Validators.required]),
    userType: new FormControl(2),
  })

  get getName()
  {
    return this.representative.controls['userFullName'];
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
    return this.representative.controls['userBranchId'];
  }
  get getGovernorate()
  {
    return this.representative.controls['governorateIds'];
  }
  get getPhone()
  {
    return this.representative.controls['userPhoneNo'];
  }
  get getAddress()
  {
    return this.representative.controls['userAddress'];
  }
  get getDiscount()
  {
    return this.representative.controls['discountType'];
  }
  get getCompanyPercentage()
  {
    return this.representative.controls['companyPercentage'];
  }

  ngOnInit(): void {

  }


  onSubmit(){

    this.representative.controls['governorateIds'].setValue(this.selectedGovernorate);
    this.representative.controls['userBranchId'].setValue(Number(this.getBranch.value));
    this.representative.controls['discountType'].setValue(Number(this.getDiscount.value));
    console.log(this.representative.value)
    return false;
  }
  selectGov(e:any){
    if(e.target['checked']){
      this.selectedGovernorate.push(Number(e.target.value))
    }
    else{
      this.selectedGovernorate=this.selectedGovernorate.filter(n=> n !== e.target.value);
    }

  }


}
