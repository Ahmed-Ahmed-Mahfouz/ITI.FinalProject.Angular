import { ICity } from '../../DTOs/DisplayDTOs/ICity';
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
import { Status } from '../../Enums/Status';
import { IBranch } from '../../DTOs/DisplayDTOs/IBranch';

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
  cities: ICity[] = [];
  branches: IBranch[] = [];

  statusOptions = [
    { label: 'Inactive', value: Status.Inactive },
    { label: 'Active', value: Status.Active },
  ];

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
      status: [Status.Active, Validators.required],
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
        .GetById('https://localhost:7057/api/Merchant/' + merchantId)
        .subscribe((merchant: IDisplayMerchant | undefined) => {
          if (this.merchantForm && merchant) {
            this.merchantForm.patchValue(merchant);
            this.specialPackages = merchant.specialPackages; // Populate specialPackages array
            console.log(this.specialPackages);
            this.merchantForm.patchValue({
              governorateName: merchant.governorateName,
              cityName: merchant.cityName,
              branchName: merchant.branchName,
            });
          }
        });
    }

    const url = 'https://localhost:7057/api/';

    this.governorateService
      .GetAll(url + 'Governorate')
      .subscribe((data: IGovernorate[]) => {
        this.governorates = data;
      });

    this.cityService.GetAll(url + 'Cities').subscribe((data: ICity[]) => {
      this.cities = data;
    });

    this.branchService.GetAll(url + 'Branches').subscribe((data: IBranch[]) => {
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

  deleteSpecialPackage(index: number) {}

  onSubmit() {}
}
