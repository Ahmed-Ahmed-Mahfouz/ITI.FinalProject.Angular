import { IEmployeeUpdate } from './../../DTOs/UpdateDTOs/IEmployeeUpdate';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,FormsModule,
  ReactiveFormsModule,} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../Services/employee.service';
import { IEmployee } from '../../DTOs/DisplayDTOs/IEmployee';
import { Status } from '../../Enums/Status';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup; 
  statusOptions = Object.keys(Status); 
  successAlert = false;
  deleteAlert = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      id: [0],
      fullName: [''],
      address: [''],
      PhoneNumber: [''],
      userName: [''],
      email: [''],
      passwordHash: [''],
      branch: [''],
      role: [''],
      status: [Status.Inactive],
    });
  }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeService
        .GetById(+employeeId)
        .subscribe((employee: IEmployee | undefined) => {
          if (this.employeeForm && employee) {
            console.log(employee);
            this.employeeForm.patchValue(employee);
          }
        });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployee: IEmployeeUpdate = this.employeeForm.value;
      this.employeeService[updateEmployee](updatedEmployee).subscribe(
        () => {
          this.successAlert = true;
          setTimeout(() => this.successAlert = false, 3000);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
}