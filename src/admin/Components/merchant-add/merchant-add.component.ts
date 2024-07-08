import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from '../../Services/merchant.service';
import { CityService } from '../../Services/city.service';
import { BranchService } from '../../Services/branch.service';
import { GovernorateService } from '../../Services/governorate.service';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { IDisplaySpecialPackage } from '../../DTOs/DisplayDTOs/IDisplaySpecialPackage';
import { CommonModule } from '@angular/common';
import { IAddSpecialPackage } from '../../DTOs/InsertDTOs/IAddSpecialPackage';
import { IDisplayCity } from '../../../merchant/DTOs/Display DTOs/IDisplayCity';
import { IDisplayBranch } from '../../../merchant/DTOs/Display DTOs/IDisplayBranch';

@Component({
  selector: 'app-merchant-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './merchant-add.component.html',
  styleUrl: './merchant-add.component.css',
})
export class MerchantAddComponent implements OnInit {
  addMerchantForm: FormGroup;
  newPackageForm: FormGroup;
  governorates: IGovernorate[] = [];
  cities: IDisplayCity[] = [];
  branches: IDisplayBranch[] = [];
  specialPackages: IAddSpecialPackage[] = [];
  displaySpecialPackage: IDisplaySpecialPackage[] = [];
  addSpecialPackage = false;

  constructor(
    private formBuilder: FormBuilder,
    private merchantService: MerchantService,
    private governorateService: GovernorateService,
    private cityService: CityService,
    private branchService: BranchService,
    private router: Router
  ) {
    this.addMerchantForm = this.formBuilder.group({
      storeName: ['', Validators.required],
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      merchantPayingPercentageForRejectedOrders: [0, Validators.required],
      specialPickupShippingCost: [0, Validators.required],
      status: [1, Validators.required],
      cityID: [0, Validators.required],
      governorateID: [0, Validators.required],
      branchID: [0, Validators.required],
      specialPackages: [[]],
    });

    this.newPackageForm = this.formBuilder.group({
      governorateId: [0, Validators.required],
      cityId: [0, Validators.required],
      shippingPrice: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();
    this.loadCities();
    this.loadBranches();
  }

  loadGovernorates() {
    const url = 'https://localhost:7057/api/Governorate';
    this.governorateService.GetAll(url).subscribe((governorates) => {
      this.governorates = governorates;
    });
  }

  loadCities() {
    const url = 'https://localhost:7057/api/Cities';
    this.cityService.GetAll(url).subscribe((cities) => {
      this.cities = cities;
    });
  }

  loadBranches() {
    const url = 'https://localhost:7057/api/Branches';
    this.branchService.GetAll(url).subscribe((branches) => {
      this.branches = branches;
    });
  }

  toggleAddNewPackage() {
    this.addSpecialPackage = !this.addSpecialPackage;
  }

  saveSpecialPackage() {
    if (this.newPackageForm.valid) {
      const governorateId = this.newPackageForm.value.governorateId;
      const cityId = this.newPackageForm.value.cityId;

      const newPackage: IAddSpecialPackage = {
        governorateId,
        cityId,
        shippingPrice: this.newPackageForm.value.shippingPrice,
      };

      // Assuming you're adding a new package here
      this.specialPackages.push({
        ...newPackage,
      });

      this.displaySpecialPackage.push({
        id: 0,
        governorateName:
          this.governorates.find((gov) => gov.id == governorateId)?.name ||
          'test',
        cityName: this.cities.find((city) => city.id == cityId)?.name || 'test',
        shippingPrice: this.newPackageForm.value.shippingPrice,
        merchantName: this.addMerchantForm.value.storeName || '',
      });

      // Update addMerchantForm's specialPackages value
      this.addMerchantForm.patchValue({
        specialPackages: this.specialPackages,
      });

      this.addSpecialPackage = false;
    }
  }

  deleteSpecialPackage(index: number) {
    this.displaySpecialPackage.splice(index, 1);
    this.specialPackages.splice(index, 1);
    this.addMerchantForm.patchValue({
      specialPackages: this.specialPackages,
    });
  }

  onSubmit() {
    if (this.addMerchantForm.valid) {
      console.log(this.addMerchantForm.value);
      this.merchantService
        .Add('https://localhost:7057/api/Merchant', this.addMerchantForm.value)
        .subscribe(
          () => {
            alert('Merchant added successfully');
            this.router.navigate(['/Admin/Merchant']);
          },
          (error) => {
            alert('An error occurred while adding the merchant');
            console.error(error);
          }
        );
    } else {
      console.error('Form invalid:', this.addMerchantForm);
    }
  }
}
