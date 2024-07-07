import { IDisplayOrder } from '../../admin/DTOs/DisplayDTOs/IOrder';
import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../admin/Services/generic.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IAddOrder } from '../../merchant/DTOs/Insert DTOs/IAddOrder';
import { IUpdateOrder } from '../../merchant/DTOs/Update DTOs/IUpdateOrder';

@Component({
  selector: 'app-order-show',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './order-show.component.html',
  styleUrl: './order-show.component.css'
})
export class OrderShowComponent implements OnInit {
  baseUrl:string="http://localhost:5241/api/";
  orders:IDisplayOrder[]=[]

  constructor(public orderServ:GenericService<IDisplayOrder,IAddOrder,IUpdateOrder>) {
  }

  ngOnInit(): void {
    this.orderServ.GetAll(this.baseUrl+"orders").subscribe({
      next:(value)=> {
        this.orders=value;
      },
      error:(err)=> {
        console.log(err);

      },
    })
  }

}
