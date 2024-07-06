import { AddRepresentative } from '../DTOs/InsertDTOs/IRepresentativeInsert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  baseURL:string="https://localhost:7057/api/Representative/";
  constructor(public httpClient:HttpClient) { }

  addRepresentative(representative:AddRepresentative){
    return this.httpClient.post(this.baseURL,representative);
  }
  getAllRepresentatives(){
    return this.httpClient.get(this.baseURL);
  }
  getRepresentative(id:string){
    return this.httpClient.get(this.baseURL+id);
  }
  editRepresentative(id:string,representative:AddRepresentative){
    return this.httpClient.put(this.baseURL+id,representative);
  }
  deleteRepresentative(id:string){
    return this.httpClient.delete(this.baseURL+id);
  }

}
