import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginationDTO } from '../DTOs/DisplayDTOs/IPaginationDTO';

@Injectable({
  providedIn: 'root',
})
export class GenericService<
  T1 extends object,
  T2 extends object,
  T3 extends object
> {
  baseUrl: string;
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = '';
    // this.headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('Token')}`,
    //   'Access-Control-Allow-Origin': '*',
    // });
    this.headers = new HttpHeaders({
      Authorization: `Bearer `,
      'Access-Control-Allow-Origin': '*',
    });
  }

  GetAll(url:string) {
    return this.httpClient.get<T1[]>(
      url,
      { headers: this.headers }
    );
  }

  GetPage(url:string) {
    return this.httpClient.get<IPaginationDTO<T1>>(
      url,
      { headers: this.headers }
    );
  }

  GetById(url:string) {
    return this.httpClient.get<T1 | undefined>(
      url,
      { headers: this.headers }
    );
  }

  Add(url:string, element: T2) {
    return this.httpClient.post<any>(
      url,
      element,
      { headers: this.headers }
    );
  }

  Edit(url:string, element:T3){
    return this.httpClient.put(url, element, {headers: this.headers});
  }

  Delete(url:string) {
    return this.httpClient.delete(
      url,
      { headers: this.headers }
    );
  }
}
