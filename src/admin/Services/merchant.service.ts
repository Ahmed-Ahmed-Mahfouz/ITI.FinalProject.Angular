import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IMerchant } from '../DTOs/DisplayDTOs/IMerchant';
import { IAddMerchant } from '../DTOs/InsertDTOs/IAddMerchant';
import { IUpdateMerchant } from '../DTOs/UpdateDTOs/IUpdateMerchant';

@Injectable({
  providedIn: 'root',
})
export class MerchantService extends GenericService<
  IMerchant,
  IAddMerchant,
  IUpdateMerchant,
  number
> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'Merchant';
  }
}
