import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../Services/branch.service';
import { IDisplayBranch} from '../../DTOs/DisplayDTOs/IDisplayBranch'



@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  addEmployeeForm: FormGroup;
  branches: IDisplayBranch[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private router: Router
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      passwordHash: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      branch: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBranches();
  }


  loadBranches(){
    const url = 'https://localhost:7057/api/Branches';
    this.branchService.GetAll(url).subscribe({next : (branches) =>{this.branches=branches;}})
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      console.log(this.addEmployeeForm.value);
      this.employeeService.Add('https://localhost:7057/api/Employee', this.addEmployeeForm.value).subscribe(
        {next:() => {
          alert('Employee added successfully');
          this.router.navigate(['/Admin']);
        },
        error:(error) => {
          alert('An error occurred while adding the employee');
          console.error(error);
        }}
      );
    } else {
      console.error('Form invalid:', this.addEmployeeForm);
    }
  }
}
