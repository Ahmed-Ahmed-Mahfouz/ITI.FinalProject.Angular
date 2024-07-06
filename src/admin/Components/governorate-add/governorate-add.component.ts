import { Status } from './../../Enums/Status';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericService } from '../../Services/generic.service';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { IGovernorateInsert } from '../../DTOs/InsertDTOs/IGovernorateInsert';
import { IGovernorateUpdate } from '../../DTOs/UpdateDTOs/IGovernorateUpdate';
import { Router } from 'express';

@Component({
  selector: 'app-governorate-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './governorate-add.component.html',
  styleUrl: './governorate-add.component.css'
})
export class GovernorateAddComponent implements OnDestroy {

  govStatus:any;

  options:string[];

  form:FormGroup;

  gSub:any;

  constructor(
    private governorateService:GenericService<IGovernorate, IGovernorateInsert, IGovernorateUpdate>,
    private router:Router
  ) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl('', [Validators.required])
    })

    this.govStatus = Status;

    this.options = Object.keys(this.govStatus).map(key => this.govStatus[key]);

    this.options = this.options.filter(el => typeof(el) != "number" )
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

  get getName(){
    return this.form.controls['name'];
  }

  get getStatus(){
    return this.form.controls['status'];
  }

  addGovernorate() {
    this.gSub = this.governorateService.Add("https://localhost:7057/api/Governorate", this.form.value).subscribe({
      next: data => {

      },
      error: error => {
        console.log(error);
      }
    })
  }
}
