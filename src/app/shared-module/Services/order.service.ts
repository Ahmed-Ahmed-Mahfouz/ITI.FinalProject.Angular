import { Status } from './../../../admin/Enums/Status';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { IDisplayOrder } from '../../../admin/DTOs/DisplayDTOs/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7057/api/Orders';
  constructor(private http:HttpClient) { }

   getOrderStatuses(): Observable<any> {
    return this.http.get<IDisplayOrder[]>(this.apiUrl,{headers:new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNmExNTNjMDMtNTQ3YS00ZTY3LWEzZmQtMGI3YjBiN2Q4Njk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiRXhwaXJlRGF0ZSI6IlR1ZXNkYXksIEp1bHkgOSwgMjAyNCAyOjQyIFBNIiwiVXNlclR5cGUiOiJBZG1pbiIsImV4cCI6MTcyMDUyNTM3Nn0.Rryk1o91awLYUXpEAdKoP5r0-pEYhYmbxuoN9MJYsOE`,
      'Access-Control-Allow-Origin': '*',
    })}).pipe(
      map(orders => {
        const statuses = {
          New: 0,
          Pending: 0,
          RepresentativeDelivered: 0,
          Delivered: 0,
          Unreachable: 0,
          Delayed: 0,
          PartiallyDelivered: 0,
          Cancelled: 0,
          RejectedWithPayment: 0,
          RejectedWithPartiallyPayment: 0,
          RejectedWithoutPayment: 0
        };
        console.log(orders);
        orders.forEach(order => {
          switch (order.status) {
            case 0:
              statuses.New++;
              break;
            case 1:
              statuses.Pending++;
              break;
            case 2:
              statuses.RepresentativeDelivered++;
              break;
            case 3:
              statuses.Delivered++;
              break;
            case 4:
              statuses.Unreachable++;
              break;
            case 5:
              statuses.Delayed++;
              break;
            case 6:
              statuses.PartiallyDelivered++;
              break;
            case 7:
              statuses.Cancelled++;
              break;
            case 8:
              statuses.RejectedWithPayment++;
              break;
            case 9:
              statuses.RejectedWithPartiallyPayment++;
              break;
            case 10:
              statuses.RejectedWithoutPayment++;
              break;
            default:
              break;
          }
        });
        
        return statuses;
      })
    );
  }
}
