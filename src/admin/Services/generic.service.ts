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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZTVlMDQwYjAtMWRmMy00ZDRkLTg4ZmItNDNiYmJhMjVmNTgwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiRXhwaXJlRGF0ZSI6IlN1bmRheSwgSnVseSA3LCAyMDI0IDM6MjUgQU0iLCJVc2VyVHlwZSI6IkFkbWluIiwiZXhwIjoxNzIwMzExOTE1fQ.aIflQpb6Zr9JXslnREWtOQ9GpRp83--iAhn-M5FZM9A`,
      'Access-Control-Allow-Origin': '*',
    });
  }

  GetAll() {
    return this.httpClient.get<T1[]>(
      'https://localhost:7057/api/' + this.baseUrl,
      { headers: this.headers }
    );
  }

  GetById(id: T4) {
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

  Edit(id:T4,element:T3){
    return this.httpClient.put(`http://localhost:5241/api/${this.baseUrl}/${id}`, element, {headers: this.headers});
  }

  Delete(id: T4) {
    return this.httpClient.delete(
      `https://localhost:7057/api/${this.baseUrl}/${id}`,
      { headers: this.headers }
    );
  }
}
