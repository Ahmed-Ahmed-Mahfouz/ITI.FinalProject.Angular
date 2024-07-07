import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { IDisplayCity } from '../../merchant/DTOs/Display DTOs/IDisplayCity';
import { IAddCity } from '../../merchant/DTOs/Insert DTOs/IAddCity';
import { IUpdateCity } from '../../merchant/DTOs/Update DTOs/IUpdateCity';


@Injectable({
  providedIn: 'root',
})
export class CityService extends GenericService<
  IDisplayCity,
  IAddCity,
  IUpdateCity
> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'Cities';
  }
}
