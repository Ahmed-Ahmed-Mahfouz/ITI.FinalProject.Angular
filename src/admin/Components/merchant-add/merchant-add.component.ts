import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from '../../Services/merchant.service';
import { CityService } from '../../Services/city.service';
import { BranchService } from '../../Services/branch.service';
import { GovernorateService } from '../../Services/governorate.service';
import { IDisplayBranch } from './../../DTOs/DisplayDTOs/IDisplayBranch';
import { IDisplayCity } from './../../DTOs/DisplayDTOs/IDisplayCity';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';

@Component({
  selector: 'app-merchant-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './merchant-add.component.html',
  styleUrls: ['./merchant-add.component.css'],
})
export class MerchantAddComponent implements OnInit {
  addMerchantForm: FormGroup;
  governorates: IGovernorate[] = [];
  cities: IDisplayCity[] = [];
  branches: IDisplayBranch[] = [];

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
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      specialPickupShippingCost: [0, Validators.required],
      merchantPayingPercentageForRejectedOrders: [0, Validators.required],
      cityID: [0, Validators.required],
      governorateID: [0, Validators.required],
      branchId: [0, Validators.required],
      // Add any other form controls here
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();
    this.loadCities();
    this.loadBranches();
  }

  loadGovernorates() {
    this.governorateService
      .GetAll()
      .subscribe((governorates) => (this.governorates = governorates));
  }
  loadCities() {
    this.cityService.GetAll().subscribe((cities) => (this.cities = cities));
  }
  loadBranches() {
    this.branchService
      .GetAll()
      .subscribe((branches) => (this.branches = branches));
  }

  onSubmit() {
    if (this.addMerchantForm.valid) {
      this.merchantService.Add(this.addMerchantForm.value).subscribe(
        () => {
          alert('Merchant added successfully');
          this.router.navigate(['/merchants']);
        },
        (error) => {
          alert('An error occurred while adding the merchant');
          console.error(error);
        }
      );
    }
  }
}
