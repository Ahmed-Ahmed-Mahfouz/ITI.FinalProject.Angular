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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-representative-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './representative-list.component.html',
  styleUrl: './representative-list.component.css'
})
export class RepresentativeListComponent {

  branches:IBranch[]=[]
  governorates:IGovernorate[]= []
  representatives:IRepresentative[]=[]
  // cities:ICity[]=[]

  constructor(
    public branchServ:GenericService<IBranch,IBranchInsert,IBranchUpdate>,
    public governorateServ:GenericService<IGovernorate,IBranchInsert,IBranchUpdate>,
    public representativeServ:GenericService<IRepresentative,IRepresentativeInsert,IRepresentativeUpdate>

  ) {
  }

  ngOnInit(): void {

    //get branches
    this.branchServ.GetAll("http://localhost:5241/api/branches").subscribe({
      next:(value)=> {
        this.branches=value;


      },
    })

    //get governorate
    this.governorateServ.GetAll("http://localhost:5241/api/governorate").subscribe({
      next:(value)=> {
        this.governorates=value

      },
    })

    //get representative
    this.representativeServ.GetAll("http://localhost:5241/api/representative").subscribe({
      next:(value)=> {
        this.representatives=value

      },
      error:(err)=> {
        console.log(err);

      },
    })

  }
  StatusName(s:Status){
    return Status[s]
  }


  deleteRepresentative(id:string){
    this.representativeServ.Delete("http://localhost:5241/api/representative/"+id).subscribe({
      next:(value)=>{
        console.log(value);
        this.representatives=this.representatives.filter(r=>r.id!=id);

      },
      error:(err)=>{
        console.log(err);

      },
    })
  }

  getBranchName(id:number)
  {
    return this.branches.find(b=> b.id==id)?.name
  }
  getGovNames(govIds:number[]){
    let govNames:any[]=[]
    govIds.forEach(id => {
      govNames.push(this.governorates.find(g=>g.id==id)?.name)
    });
    return govNames;

  }
}
