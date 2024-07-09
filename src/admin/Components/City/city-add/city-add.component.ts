import { Component} from '@angular/core';
import { CityService } from '../../../Services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../Enums/Status';
import { IAddCity } from '../../../DTOs/InsertDTOs/IAddCity';
import { CommonModule } from '@angular/common';
import { IGovernorate } from '../../../DTOs/DisplayDTOs/IGovernorate';
import { GenericService } from '../../../Services/generic.service';
import { IGovernorateInsert } from '../../../DTOs/InsertDTOs/IGovernorateInsert';
import { IGovernorateUpdate } from '../../../DTOs/UpdateDTOs/IGovernorateUpdate';

@Component({
  selector: 'app-city-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './city-add.component.html',
  styleUrl: './city-add.component.css'
})
export class CityAddComponent{
  governorates:IGovernorate[]=[];
  cityForm:FormGroup;
  constructor(
    private cityService:CityService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private governorateService:GenericService<IGovernorate,IGovernorateInsert,IGovernorateUpdate>
  ){
      this.cityForm=this.formBuilder.group({
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
      

    addCity(){
      const city:IAddCity = this.cityForm.value;
      console.log(city);
      this.cityService.Add("https://localhost:7057/api/Cities",city).subscribe({next: (res)=>{
        console.log(res);
        this.router.navigate(['/admin/city/']);

      },
      error: (err)=>{
        console.log(err);
      }

        });
        
      
    }

}
