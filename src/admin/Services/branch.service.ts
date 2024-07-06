import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBranchInsert } from '../DTOs/InsertDTOs/IBranchInsert';
import { IBranchUpdate } from '../DTOs/UpdateDTOs/IBranchUpdate';

@Injectable({
  providedIn: 'root'
})
export class BranchService {


  baseURL:string="http://localhost:5241/api/Branches";
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
    'Access-Control-Allow-Origin': '*'
  });
  constructor(public httpClient:HttpClient) { }

  Add(branch:IBranchInsert){
    return this.httpClient.post(this.baseURL,branch,{headers:this.headers});
  }
  GetAll(){
    return this.httpClient.get(this.baseURL,{headers:this.headers});
  }
  GetById(id:number){
    return this.httpClient.get(this.baseURL+'/'+id,{headers:this.headers});
  }
  Edit(id:number,branch:IBranchUpdate){
    return this.httpClient.put(this.baseURL+'/'+id,branch,{headers:this.headers});
  }
  Delete(id:number){
    return this.httpClient.delete(this.baseURL+'/'+id);
  }

}
