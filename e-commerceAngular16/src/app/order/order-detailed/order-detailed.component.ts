import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit{
  order? : Order;

  constructor(private orderService: OrderService, 
    private bcService: BreadcrumbService, 
    private activeRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder()
  {
    const orderId = this.activeRoute.snapshot.paramMap.get('id');
    if(orderId) this.orderService.getOrderById(orderId).subscribe({
      next: response => {
        this.order = response,
        this.bcService.set('@orderDetailed', `Order#${this.order.id} - ${this.order.status}`)
      }
    })
  }
}
