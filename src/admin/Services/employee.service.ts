import { IEmployee } from './../DTOs/InsertDTOs/IEmployeeInsert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseURL:string="https://localhost:5241/api/Employee/";
  constructor(public httpClient:HttpClient) { }

  addEmployee(Employee:IEmployee){
    return this.httpClient.post(this.baseURL,Employee);
  }
  getAllEmployee(){
    return this.httpClient.get(this.baseURL);
  }
  getEmployee(id:string){
    return this.httpClient.get(this.baseURL+id);
  }
  editEmployee(id:string,Employee:IEmployee){
    return this.httpClient.put(this.baseURL+id,Employee);
  }
  deleteEmployee(id:string){
    return this.httpClient.delete(this.baseURL+id);
  }

}

