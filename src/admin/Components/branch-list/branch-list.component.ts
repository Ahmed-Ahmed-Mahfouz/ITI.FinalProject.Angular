import { Status } from './../../Enums/Status';

import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../Services/branch.service';
import { GenericService } from '../../Services/generic.service';
import { IBranch } from '../../DTOs/DisplayDTOs/IBranch';
import { IBranchInsert } from '../../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../../DTOs/UpdateDTOs/IBranchUpdate';
import { CommonModule } from '@angular/common';
import { ICity } from '../../DTOs/DisplayDTOs/ICity';
import { ICityInsert } from '../../DTOs/InsertDTOs/ICityInsert';
import { ICityUpdate } from '../../DTOs/UpdateDTOs/ICityUpdate';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {

  branches:IBranch[]=[]
  cities:ICity[]=[]

  constructor(
    public branchServ:GenericService<IBranch,IBranchInsert,IBranchUpdate,number>,
    public cityServ: GenericService<ICity, ICityInsert, ICityUpdate, number>,
  ) {
  }

  ngOnInit(): void {

    //get branches
    this.branchServ.baseUrl="branches"
    this.branchServ.GetAll().subscribe({
      next:(value)=> {
        this.branches=value;


      },
    })

    //get cities
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
  }
  StatusName(s:Status){
    return Status[s]
  }

  getCityName(id:number){
    return this.cities.find(c=>c.id==id)?.name;
  }

  deleteBranch(id:number){
    this.branchServ.baseUrl="branches"
    this.branchServ.Delete(id).subscribe({
      next:(value)=>{
        console.log(value);

      },
      error:(err)=>{
        console.log(err);

      },
    })
  }

}
