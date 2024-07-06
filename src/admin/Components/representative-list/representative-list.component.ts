import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBranch } from '../../DTOs/DisplayDTOs/IBranch';
import { IBranchInsert } from '../../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../../DTOs/UpdateDTOs/IBranchUpdate';
import { GenericService } from '../../Services/generic.service';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { Status } from '../../Enums/Status';
import { IRepresentative } from '../../DTOs/DisplayDTOs/IRepresentative';
import { IRepresentativeInsert } from '../../DTOs/InsertDTOs/IRepresentativeInsert';
import { IRepresentativeUpdate } from '../../DTOs/UpdateDTOs/IRepresentativeUpdate';

@Component({
  selector: 'app-representative-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './representative-list.component.html',
  styleUrl: './representative-list.component.css'
})
export class RepresentativeListComponent {

  branches:IBranch[]=[]
  governorates:IGovernorate[]= []
  representatives:IRepresentative[]=[]
  // cities:ICity[]=[]

  constructor(
    public branchServ:GenericService<IBranch,IBranchInsert,IBranchUpdate,number>,
    public governorateServ:GenericService<IGovernorate,IBranchInsert,IBranchUpdate,number>,
    public representativeServ:GenericService<IRepresentative,IRepresentativeInsert,IRepresentativeUpdate,string>

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

    //get governorate
    this.governorateServ.baseUrl="governorate"
    this.governorateServ.GetAll().subscribe({
      next:(value)=> {
        this.governorates=value

      },
    })

    //get representative
    this.representativeServ.baseUrl="representative"
    this.representativeServ.GetAll().subscribe({
      next:(value)=> {
        this.representatives=value

      },
    })

  }
  StatusName(s:Status){
    return Status[s]
  }


  deleteRepresentative(id:string){
    this.representativeServ.baseUrl="representative"
    this.representativeServ.Delete(id).subscribe({
      next:(value)=>{
        console.log(value);

      },
      error:(err)=>{
        console.log(err);

      },
    })
  }
}
