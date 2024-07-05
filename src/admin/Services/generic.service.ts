import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericService<
  T1 extends object,
  T2 extends object,
  T3 extends object,
  T4
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWRtaW4iLCJJZCI6ImRhZGMwZjkwLTA3M2MtNDEzZi04MGVjLTc1YmQyNjIwMzlmMSIsIlVzZXJOYW1lIjoiYWRtaW4iLCJFeHBpcmVEYXRlIjoiU2F0dXJkYXksIEp1bHkgNiwgMjAyNCAzOjI2IEFNIiwiVXNlclR5cGUiOiJBZG1pbiIsImV4cCI6MTcyMDIyNTU5OH0.XA11xpdkSjrtOt-B_Rzn3aaOqb55sZvTeYeWzDq4aI0`,
      'Access-Control-Allow-Origin': '*',
    });
  }

  GetAll() {
    return this.httpClient.get<T1[]>(
      'https://localhost:7057/api/' + this.baseUrl,
      { headers: this.headers }
    );
  }

  GetById(id: number) {
    return this.httpClient.get<T1 | undefined>(
      `https://localhost:7057/api/${this.baseUrl}/${id}`,
      { headers: this.headers }
    );
  }

  Add(element: T2) {
    return this.httpClient.post<any>(
      'https://localhost:7057/api/' + this.baseUrl,
      element,
      { headers: this.headers }
    );
  }

  Edit(id: number, element: T3) {
    return this.httpClient.put(
      `https://localhost:7057/api/${this.baseUrl}/${id}`,
      element,
      { headers: this.headers }
    );
  }

  Delete(id: T4) {
    return this.httpClient.delete(
      `https://localhost:7057/api/${this.baseUrl}/${id}`,
      { headers: this.headers }
    );
  }
}
