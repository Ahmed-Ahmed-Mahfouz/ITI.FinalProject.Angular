import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GenericService<T1 extends object , T2 extends object, T3 extends object, T4> {

  baseUrl:string;
  headers:HttpHeaders;
  constructor(private httpClient:HttpClient) { 
    this.baseUrl = '';
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("Token")}`,
      'Access-Control-Allow-Origin': '*'
    });
  }

  GetAll(){
    return this.httpClient.get<T1[]>('http://localhost:5241/api/'+this.baseUrl, {headers: this.headers})
  }

  GetById(id:number){
    return this.httpClient.get<T1 | undefined>(`http://localhost:5241/api/${this.baseUrl}/${id}`, {headers: this.headers});
  }

  Add(element:T2){
    return this.httpClient.post<any>('http://localhost:5241/api/'+this.baseUrl, element, {headers: this.headers});
  }

  Edit(id:number,element:T3){
    return this.httpClient.put(`http://localhost:5241/api/${this.baseUrl}/${id}`, element, {headers: this.headers});
  }

  Delete(id:T4){
    return this.httpClient.delete(`http://localhost:5241/api/${this.baseUrl}/${id}`, {headers: this.headers});
  }
}
