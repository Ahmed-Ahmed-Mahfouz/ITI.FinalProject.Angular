import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IDisplayBranch } from '../DTOs/DisplayDTOs/IDisplayBranch';
import { IBranchInsert } from '../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../DTOs/UpdateDTOs/IBranchUpdate';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends GenericService<
  IDisplayBranch,
  IBranchInsert,
  IBranchUpdate
> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'Branches';
  }
}