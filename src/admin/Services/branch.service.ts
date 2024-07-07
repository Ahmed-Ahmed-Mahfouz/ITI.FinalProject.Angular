import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranchInsert } from '../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../DTOs/UpdateDTOs/IBranchUpdate';
import { IBranch } from '../DTOs/DisplayDTOs/IBranch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  baseURL: string = 'https://localhost:7057/api/Branches/';
  constructor(public httpClient: HttpClient) {}

  AddBranch(branch: IBranchInsert) {
    return this.httpClient.post(this.baseURL, branch);
  }
  getAllBranches() {
    return this.httpClient.get(this.baseURL);
  }
  getBranch(id: number) {
    return this.httpClient.get(this.baseURL + id);
  }
  editBranch(id: number, branch: IBranchInsert) {
    return this.httpClient.put(this.baseURL + id, branch);
  }
  deleteBranch(id: number) {
    return this.httpClient.delete(this.baseURL + id);
  }

}
