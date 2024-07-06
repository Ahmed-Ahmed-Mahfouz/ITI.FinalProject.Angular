import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../Services/merchant.service';
import { IDisplayMerchant } from '../../DTOs/DisplayDTOs/IDisplayMerchant';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDisplaySpecialPackage } from '../../DTOs/DisplayDTOs/IDisplaySpecialPackage';
import { IAddSpecialPackage } from '../../DTOs/InsertDTOs/IAddSpecialPackage';

@Component({
  selector: 'app-merchant-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css'],
})
export class MerchantEditComponent {
  merchantForm: FormGroup; // Declare the merchantForm property
  specialPackages: IDisplaySpecialPackage[] = []; // Declare the specialPackages property
  newPackage: IAddSpecialPackage = {
    shippingPrice: 0,
    cityId: 0,
    governorateId: 0,
    merchantId: '',
  };
  addSpecialPackage = false;
  successAlert = false;
  deleteAlert = false;

  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.merchantForm = this.formBuilder.group({
      userName: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      branchName: '',
      storeName: '',
      governorateName: '',
      cityName: '',
      specialPickupShippingCost: 0,
      merchantPayingPercentageForRejectedOrders: 0,
    });
  }

  ngOnInit(): void {
    const merchantId = this.route.snapshot.paramMap.get('id');
    if (merchantId) {
      this.merchantService
        .GetById(merchantId)
        .subscribe((merchant: IDisplayMerchant | undefined) => {
          if (this.merchantForm && merchant) {
            console.log(merchant);
            this.merchantForm.patchValue(merchant);
            this.specialPackages = merchant.specialPackages;
          }
        });
    }
  }

  toggleAddNewPackage() {
    this.addSpecialPackage = !this.addSpecialPackage;
  }
}
