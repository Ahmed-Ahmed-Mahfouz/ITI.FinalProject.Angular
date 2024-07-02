import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBranch } from '../DTOs/InsertDTOs/addBranch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

   baseURL:string="https://localhost:7057/api/Branches/";
  constructor(public httpClient:HttpClient) { }

  AddBranch(branch:AddBranch){
    return this.httpClient.post(this.baseURL,branch);
  }
  getAllBranches(){
    return this.httpClient.get(this.baseURL);
  }
  getBranch(id:number){
    return this.httpClient.get(this.baseURL+id);
  }
  editBranch(id:number,branch:AddBranch){
    return this.httpClient.put(this.baseURL+id,branch);
  }
  deleteBranch(id:number){
    return this.httpClient.delete(this.baseURL+id);
  }
}
