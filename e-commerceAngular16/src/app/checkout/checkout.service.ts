import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createOrder(order: OrderToCreate)
  {
    return this.http.post<Order>(this.baseUrl + 'Orders', order);
  }


  getDeliveryMethods() {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'Orders/GetDeliveryMethods').pipe(
      map(dm => {
        return dm.sort((a,b) => b.price - a.price);
      })
    )
  }
}
