import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityService } from '../../../Services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../Enums/Status';
import { IDisplayCity } from '../../../DTOs/DisplayDTOs/IDisplayCity';
import { IUpdateCity } from '../../../DTOs/UpdateDTOs/IUpdateCity';
import { IGovernorate } from '../../../DTOs/DisplayDTOs/IGovernorate';
import { GenericService } from '../../../Services/generic.service';
import { IGovernorateInsert } from '../../../DTOs/InsertDTOs/IGovernorateInsert';
import { IGovernorateUpdate } from '../../../DTOs/UpdateDTOs/IGovernorateUpdate';

@Component({
  selector: 'app-city-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.css'
})
export class CityEditComponent {
  governorates:IGovernorate[]=[];
  cityForm:FormGroup;
  cityId:number= 0;
  constructor(
  private cityService:CityService,
  private route:ActivatedRoute,
  private formBuilder:FormBuilder,
  private router:Router,
  private governorateService:GenericService<IGovernorate,IGovernorateInsert,IGovernorateUpdate>
  ){
    this.cityForm=this.formBuilder.group({
      id:0,
      name:'',
      status:Status.Active,
      normalShippingCost:0,
      pickupShippingCost:0,
      governorateId:0,
    });
    this.governorateService.GetAll("https://localhost:7057/api/governorate").subscribe(
      (governorates:IGovernorate[]) => {
        this.governorates = governorates;
        console.log("Governorates from DB " + JSON.stringify(this.governorates, null, 2)); 
      });
  }
  ngOnInit():void{
    
    this.cityId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.cityId);
     //this.cityForm.value.id=this.cityId;
     //this.cityForm.controls['id'].setValue(this.cityId);
     //this.cityForm.setValue({...this.cityForm,id:this.cityId});
    if(this.cityId !=0){
      this.cityService.GetById(`https://localhost:7057/api/Cities/${this.cityId}`).subscribe((city:IDisplayCity|undefined)=>{
      if(this.cityForm&&city){
        city.id=this.cityId;
        console.log(city);
        this.cityForm.patchValue(city);
      }
      });
    }
  }
  updateCity():void{
    // console.log(this.cityForm.value.id);
    if (this.cityForm.valid) {
      const cityUpdate: IUpdateCity = this.cityForm.value;
      console.log(cityUpdate);
      this.cityService.Edit(`https://localhost:7057/api/Cities/${this.cityId}`, cityUpdate).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/admin/city']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
