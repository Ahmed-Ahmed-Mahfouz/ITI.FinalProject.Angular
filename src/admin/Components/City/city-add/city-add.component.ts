import { Component } from '@angular/core';
import { CityService } from '../../../Services/city.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../Enums/Status';
import { IAddCity } from '../../../DTOs/InsertDTOs/IAddCity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './city-add.component.html',
  styleUrl: './city-add.component.css'
})
export class CityAddComponent {
  cityForm:FormGroup;
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
    addCity(){
      const city:IAddCity = this.cityForm.value;
      console.log(city);
      this.cityService.Add("https://localhost:7057/api/Cities",city).subscribe({next: (res)=>{
        console.log(res);

      },
      error: (err)=>{
        console.log(err);
      }

        });
        
      
    }

}
