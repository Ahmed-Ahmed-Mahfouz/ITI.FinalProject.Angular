import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinValidator,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GenericService } from '../../Services/generic.service';
import { IRepresentativeInsert } from '../../DTOs/InsertDTOs/IRepresentativeInsert';
import { IRepresentative } from '../../DTOs/DisplayDTOs/IRepresentative';
import { IRepresentativeUpdate } from '../../DTOs/UpdateDTOs/IRepresentativeUpdate';
import { IBranch } from '../../DTOs/DisplayDTOs/IBranch';
import { IBranchInsert } from '../../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../../DTOs/UpdateDTOs/IBranchUpdate';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { routes } from '../../../app/app.routes';

@Component({
  selector: 'app-representative-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './representative-form.component.html',
  styleUrls: ['./representative-form.component.css'],
})
export class RepresentativeFormComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public representativeServ: GenericService<
      IRepresentative,
      IRepresentativeInsert,
      IRepresentativeUpdate
    >,
    public branchServ: GenericService<IBranch, IBranchInsert, IBranchUpdate>,
    public governorateServ: GenericService<
      IGovernorate,
      IBranchInsert,
      IBranchUpdate
    >,
    public routing: Router
  ) {}

  representative: any;
  representativeId: string = '';
  branches: IBranch[] = [];
  governorates: IGovernorate[] = [];
  selectedGovernorate: number[] = [];
  govLen: number = this.selectedGovernorate.length;
  govFlag: boolean = false;

  representativeForm = new FormGroup({
    // id: new FormControl(''),
    userFullName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
      ),
    ]),
    oldPassword: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
      ),
    ]),
    newPassword: new FormControl('', [
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
      ),
    ]),
    userBranchId: new FormControl(0, [Validators.required, Validators.min(1)]),
    governorateIds: new FormControl(this.selectedGovernorate, [
      Validators.minLength(1),
    ]),
    userPhoneNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11),
    ]),
    userAddress: new FormControl('', [Validators.required]),
    discountType: new FormControl(0, [Validators.required]),
    companyPercentage: new FormControl('', [Validators.required]),
    userStatus: new FormControl(0, [Validators.required]),
  });

  // get getId()
  // {
  //   return this.representativeForm.controls['id'];
  // }
  get getName() {
    return this.representativeForm.controls['userFullName'];
  }
  get getEmail() {
    return this.representativeForm.controls['email'];
  }
  get getPassword() {
    return this.representativeForm.controls['password'];
  }
  get getOldPassword() {
    return this.representativeForm.controls['oldPassword'];
  }
  get getNewPassword() {
    return this.representativeForm.controls['newPassword'];
  }
  get getBranch() {
    return this.representativeForm.controls['userBranchId'];
  }
  get getGovernorate() {
    return this.representativeForm.controls['governorateIds'];
  }
  get getPhone() {
    return this.representativeForm.controls['userPhoneNo'];
  }
  get getAddress() {
    return this.representativeForm.controls['userAddress'];
  }
  get getDiscount() {
    return this.representativeForm.controls['discountType'];
  }
  get getCompanyPercentage() {
    return this.representativeForm.controls['companyPercentage'];
  }

  ngOnInit(): void {
    //get id from URL
    this.route.params.subscribe({
      next: (params) => {
        this.representativeId = params['id'];

        if (this.representativeId) {
          this.representativeServ
            .GetById(
              'https://localhost:7057/api/representative/' +
                this.representativeId
            )
            .subscribe({
              next: (value) => {
                this.representative = value;
                console.log(this.representative);
                // this.getId.setValue(this.representative.id)
                this.getName.setValue(this.representative?.userFullName);
                this.getEmail.setValue(this.representative.email);
                this.getBranch.setValue(this.representative.userBranchId);
                this.getGovernorate.setValue(
                  this.representative.governorateIds
                );
                this.getPhone.setValue(this.representative.userPhoneNo);
                this.getAddress.setValue(this.representative.userAddress);
                this.getDiscount.setValue(this.representative.discountType);
                this.getCompanyPercentage.setValue(
                  this.representative.companyPercentage
                );
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
    });

    //get branches
    this.branchServ.GetAll('https://localhost:7057/api/Branches').subscribe({
      next: (value) => {
        this.branches = value;
      },
    });

    //get governorate
    this.governorateServ
      .GetAll('https://localhost:7057/api/governorate')
      .subscribe({
        next: (value) => {
          this.governorates = value;
        },
      });
  }

  onSubmit() {
    this.representativeForm.controls['governorateIds'].setValue(
      this.selectedGovernorate
    );
    this.representativeForm.controls['userBranchId'].setValue(
      Number(this.getBranch.value)
    );
    this.representativeForm.controls['discountType'].setValue(
      Number(this.getDiscount.value)
    );
    let Rep: any = {
      ...this.representativeForm.value,
      id: this.representativeId,
    };
    console.log(Rep);

    if (this.representativeId) {
      this.representativeServ
        .Edit(
          'https://localhost:7057/api/representative/' + this.representativeId,
          Rep
        )
        .subscribe({
          next: (value) => {
            console.log(value);
            this.routing.navigate(['admin/representative']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      let newRep: any = this.representativeForm.value;
      console.log(newRep);
      this.representativeServ
        .Add('https://localhost:7057/api/representative', newRep)
        .subscribe({
          next: (value) => {
            console.log(value);
            this.routing.navigate(['admin/representative']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  selectGov(e: any) {
    if (e.target['checked']) {
      this.selectedGovernorate.push(Number(e.target.value));
      this.govLen++;
    } else {
      this.selectedGovernorate = this.selectedGovernorate.filter(
        (n) => n !== Number(e.target.value)
      );
      console.log(this.selectedGovernorate);

      this.govLen--;
    }
  }
}
