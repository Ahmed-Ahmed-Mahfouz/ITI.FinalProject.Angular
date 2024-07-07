import { IDisplayCity } from './../../../merchant/DTOs/Display DTOs/IDisplayCity';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../Services/merchant.service';
import { GovernorateService } from '../../Services/governorate.service';
import { CityService } from '../../Services/city.service';
import { BranchService } from '../../Services/branch.service';
import { IDisplayMerchant } from '../../DTOs/DisplayDTOs/IDisplayMerchant';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDisplaySpecialPackage } from '../../DTOs/DisplayDTOs/IDisplaySpecialPackage';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { IUpdateSpecialPackage } from '../../DTOs/UpdateDTOs/IUpdateSpecialPackage';
import { IUpdateMerchant } from '../../DTOs/UpdateDTOs/IUpdateMerchant';
import { Status } from '../../Enums/Status';
import { IDisplayBranch } from '../../../merchant/DTOs/Display DTOs/IDisplayBranch';

@Component({
  selector: 'app-merchant-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css'],
})
export class MerchantEditComponent {
  merchantForm: FormGroup;
  newPackageForm: FormGroup;
  specialPackages: IDisplaySpecialPackage[] = [];
  addSpecialPackage = false;
  successAlert = false;
  deleteAlert = false;

  governorates: IGovernorate[] = [];
  cities: IDisplayCity[] = [];
  branches: IDisplayBranch[] = [];

  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private governorateService: GovernorateService,
    private cityService: CityService,
    private branchService: BranchService
  ) {
    this.merchantForm = this.formBuilder.group({
      id: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      branchName: ['', Validators.required],
      storeName: ['', Validators.required],
      governorateName: ['', Validators.required],
      cityName: ['', Validators.required],
      specialPickupShippingCost: [0, Validators.required],
      merchantPayingPercentageForRejectedOrders: [0, Validators.required],
      specialPackages: [[]],
    });

    this.newPackageForm = this.formBuilder.group({
      governorateId: [0, Validators.required],
      cityId: [0, Validators.required],
      shippingPrice: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    const merchantId = this.route.snapshot.paramMap.get('id');
    if (merchantId) {
      this.merchantService
        .GetById('https://localhost:5241/api/Merchant/' + merchantId)
        .subscribe((merchant: IDisplayMerchant | undefined) => {
          if (this.merchantForm && merchant) {
            this.merchantForm.patchValue(merchant);
            this.specialPackages = merchant.specialPackages;
          }
        });
    }

    const url = 'https://localhost:5241/api/';

    this.governorateService
      .GetAll(url + 'Governorate')
      .subscribe((data: IGovernorate[]) => {
        this.governorates = data;
      });

    this.cityService
      .GetAll(url + 'Cities')
      .subscribe((data: IDisplayCity[]) => {
        this.cities = data;
      });

    this.branchService
      .GetAll(url + 'Branches')
      .subscribe((data: IDisplayBranch[]) => {
        this.branches = data;
      });
  }

  toggleAddNewPackage() {
    this.addSpecialPackage = !this.addSpecialPackage;
  }

  saveSpecialPackage() {
    if (this.newPackageForm.valid) {
      const newPackage: IUpdateSpecialPackage = {
        id: this.specialPackages.length + 1,
        shippingPrice: this.newPackageForm.value.shippingPrice,
        cityId: this.newPackageForm.value.cityId,
        governorateId: this.newPackageForm.value.governorateId,
        merchantId: this.merchantForm.value.id,
      };

      // Add new package to specialPackages array
      const displayPackage: IDisplaySpecialPackage = {
        id: newPackage.id,
        cityName:
          this.cities.find((city) => city.id === newPackage.cityId)?.name || '',
        governorateName:
          this.governorates.find(
            (governorate) => governorate.id === newPackage.governorateId
          )?.name || '',
        shippingPrice: newPackage.shippingPrice,
        merchantName: this.merchantForm.value.storeName || '',
      };

      this.specialPackages.push(displayPackage);

      // Update merchantForm's specialPackages value
      this.merchantForm.patchValue({
        specialPackages: this.specialPackages,
      });

      // Update merchant with new package
      this.merchantService
        .Edit(this.merchantForm.value.id, this.merchantForm.value)
        .subscribe({
          next: () => {
            this.addSpecialPackage = false;
            this.successAlert = true;
          },
          error: (err) => {
            console.error(
              'Error updating merchant with new special package:',
              err
            );
          },
        });
    }
  }

  deleteSpecialPackage(index: number) {
    const specialPackage = this.specialPackages[index];
    this.specialPackages.splice(index, 1);

    // Update merchantForm's specialPackages value
    this.merchantForm.patchValue({
      specialPackages: this.specialPackages,
    });

    this.merchantService
      .Edit(this.merchantForm.value.id, this.merchantForm.value)
      .subscribe({
        next: () => {
          this.deleteAlert = true;
        },
        error: (err) => {
          console.error('Error deleting special package:', err);
        },
      });
  }

  onSubmit() {}
}
