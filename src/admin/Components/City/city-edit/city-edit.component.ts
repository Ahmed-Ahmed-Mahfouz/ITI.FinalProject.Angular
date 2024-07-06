import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityService } from '../../../Services/city.service';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../../Enums/Status';
import { IDisplayCity } from '../../../DTOs/DisplayDTOs/IDisplayCity';

@Component({
  selector: 'app-city-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.css'
})
export class CityEditComponent {
  cityForm:FormGroup;
  cityId:number= 0;
  constructor(
  private cityService:CityService,
  private route:ActivatedRoute,
  private formBuilder:FormBuilder
  ){
    this.cityForm=this.formBuilder.group({
      name:'',
      status:Status.Active,
      normalShippingCost:0,
      pickupShippingCost:0,
      governorateId:0,
    });
  }
  ngOnInit():void{
    
    this.cityId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.cityId !=0){
      this.cityService.GetById(this.cityId).subscribe((city:IDisplayCity|undefined)=>{
      if(this.cityForm&&city){
        console.log(city);
        this.cityForm.patchValue(city);
      }
      });
    }
  }

}
