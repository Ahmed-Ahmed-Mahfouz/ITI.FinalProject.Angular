import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-from',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './branch-from.component.html',
  styleUrl: './branch-from.component.css'
})
export class BranchFromComponent implements OnInit {

  constructor(public route:ActivatedRoute) {

  }

  cities=[{id:1,name:"b1"},{id:2,name:"b2"},{id:3,name:"b3"}]
  selectedGovernorate:number[]=[]
  govLen:number =this.selectedGovernorate.length
  govFlag:boolean=false


 branch = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(2)]),
    status: new FormControl(1, [Validators.required]),
    addingDate: new FormControl('', [Validators.required]),
    cityId: new FormControl(0, [Validators.required, Validators.min(1)]),
  })

  get getName()
  {
    return this.branch.controls['name'];
  }
  get getStatus()
  {
    return this.branch.controls['status'];
  }
  get getAddingDate()
  {
    return this.branch.controls['addingDate'];
  }
  get getCity()
  {
    return this.branch.controls['cityId'];
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(params)=> {
        console.log(params['id']);

      },
    })
  }


  onSubmit(){

    this.branch.controls['cityId'].setValue(Number(this.getCity.value));
    this.branch.controls['status'].setValue(Number(this.getStatus.value));
    console.log(this.branch.value)
    return false;
  }



}
