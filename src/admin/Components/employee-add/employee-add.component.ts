import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './../../Services/employee.service';
import { Status } from '../../Enums/Status';
import { CommonModule } from '@angular/common';
import { IEmployeeInsert } from '../../DTOs/InsertDTOs/IEmployeeInsert';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;
  statusOptions = Object.keys(Status);
  successAlert = false;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      fullName: [''],
      address: [''],
      PhoneNumber: [''],
      email: [''],
      branch: [''],
      role: [''],
      status: [Status.Inactive],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: IEmployeeInsert = this.employeeForm.value;
      this.employeeService.Add(`https://localhost:7057/api/Employees`,newEmployee).subscribe({
        next:() => {
          this.successAlert = true;
          setTimeout(() => this.successAlert = false, 3000);
          this.employeeForm.reset();
        },
        error:(error: any) => {
          console.error('Error:', error);
        }}
      );
    }
  }
}
