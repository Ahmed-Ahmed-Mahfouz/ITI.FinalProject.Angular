import { IBranch } from './../../DTOs/DisplayDTOs/IBranch';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../Services/generic.service';
import { IBranchInsert } from '../../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../../DTOs/UpdateDTOs/IBranchUpdate';
import { ICity } from '../../DTOs/DisplayDTOs/ICity';
import { ICityInsert } from '../../DTOs/InsertDTOs/ICityInsert';
import { ICityUpdate } from '../../DTOs/UpdateDTOs/ICityUpdate';
import { BranchService } from '../../Services/branch.service';

@Component({
  selector: 'app-branch-from',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './branch-from.component.html',
  styleUrl: './branch-from.component.css'
})
export class BranchFromComponent implements OnInit {

  branchId: any = 0
  branch: any = { id: 0, name: "", status: 0, addingDate: new Date(), cityId: 0 }
  cities:any[] = []

  constructor(
    public route: ActivatedRoute,
    public routing:Router,
    // public branchServ: BranchService,
    public branchServ:GenericService<IBranch,IBranchInsert,IBranchUpdate,number>,
    public cityServ: GenericService<ICity, ICityInsert, ICityUpdate, number>
  ) {
    // branchServ.baseUrl="Branches"
    // cityServ.baseUrl = "Cities"
  }





  branchForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    status: new FormControl(1, [Validators.required]),
    addingDate: new FormControl(new Date()),
    cityId: new FormControl(0, [Validators.required, Validators.min(1)]),
  })

  get getId() {
    return this.branchForm.controls['id']
  }
  get getName() {
    return this.branchForm.controls['name'];
  }
  get getStatus() {
    return this.branchForm.controls['status'];
  }
  get getAddingDate() {
    return this.branchForm.controls['addingDate'];
  }
  get getCity() {
    return this.branchForm.controls['cityId'];
  }

  ngOnInit(): void {

    this.cityServ.baseUrl = "Cities";
    this.cityServ.GetAll().subscribe({
      next: (value) => {
        console.log(value);

        this.cities = value
      },
      error: (err) => {
        console.log(err);

      },
    })


    this.route.params.subscribe({
      next: (params) => {
        this.branchId = params['id'];

        // edit branch
        if (this.branchId) {
          this.branchServ.baseUrl="branches"
          this.branchServ.GetById(this.branchId).subscribe({
            next: (value) => {
              this.branch = value;
              // console.log(this.branch);
              this.getId.setValue(this.branch.id)
              this.getName.setValue(this.branch?.name)
              this.getCity.setValue(this.branch.cityId)
              this.getStatus.setValue(this.branch.status)
              this.getAddingDate.setValue(new Date())

            },
            error: (err) => {
              console.log(err.Message);

            },
          })
        }

      },
    })
  }


  onSubmit() {

    this.branchForm.controls['cityId'].setValue(Number(this.getCity.value));
    this.branchForm.controls['status'].setValue(Number(this.getStatus.value));
    this.branchForm.controls['id'].setValue(Number(this.branchId))
    // console.log(this.branchForm.value)
    this.branch = this.branchForm.value

    if (this.branchId) {
      this.branchServ.baseUrl="branches";
      this.branchServ.Edit(this.branchId, this.branch).subscribe({
        next: (value) => {
          // console.log(value);
        },
        error: (err) => {
          console.log(err);

        },
      })
    }
    else {
      let newBranch: any = {
        name: this.getName.value,
        status: this.getStatus.value,
        cityId: this.getCity.value,
      }
      this.branchServ.baseUrl="branches";
      this.branchServ.Add(newBranch).subscribe({
        next: (value) => {
          console.log(value);

        },
        error: (err) => {
          console.log(err);

        },
      })
    }
    this.routing.navigate(['/admin/branch'])

  }




}
