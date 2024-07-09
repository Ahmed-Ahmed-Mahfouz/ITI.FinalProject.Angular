import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericService } from '../../../admin/Services/generic.service';
import { ISettings } from '../../../admin/DTOs/DisplayDTOs/ISettings';
import { IAddSettings } from '../../../admin/DTOs/InsertDTOs/IAddSettings';
import { IUpdateSettings } from '../../../admin/DTOs/UpdateDTOs/IUpdateSettings';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './setting-edit.component.html',
  styleUrl: './setting-edit.component.css'
})
export class SettingEditComponent implements OnInit{
  settingEdit: FormGroup;
  settingId: number=0;
  constructor(
    private formBuilder: FormBuilder,
    private settingService:GenericService<ISettings,IAddSettings,IUpdateSettings>,
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.settingEdit = this.formBuilder.group({
      id: 0,
      baseWeight:0,
      additionalFeePerKg:0,
      villageDeliveryFee:0,
      ordinaryShippingCost:0,
      twentyFourHoursShippingCost:0,
      fifteenDayShippingCost:0
      });
   }
  ngOnInit(): void {
    this.settingId=Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.settingId);
    if(this.settingId !=0){
      this.settingService.GetById(`https://localhost:7057/api/Settings/${this.settingId}`).subscribe((setting:ISettings|undefined)=>{
      if(this.settingEdit&&setting){
        setting.id=this.settingId;
        console.log(setting);
        this.settingEdit.patchValue(setting);
      }
      });
    }
  }
  updateSettings():void{
    console.log(this.settingEdit.value);
    if (this.settingEdit.valid) {
      const settingUpdate: IUpdateSettings = this.settingEdit.value;
      console.log(settingUpdate);
      this.settingService.Edit(`https://localhost:7057/api/Settings/${this.settingId}`, settingUpdate).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/employee/setting']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
