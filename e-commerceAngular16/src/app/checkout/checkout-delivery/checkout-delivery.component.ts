import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(private checkoutService: CheckoutService, private basketSerice: BasketService){}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: response => {this.deliveryMethods = response, console.log(this.deliveryMethods);
      },
      error: error => console.log(error.errors)
    })
  }

  setShippingPrice(deliveryMethod: DeliveryMethod)
  {
    this.basketSerice.setShippingPrice(deliveryMethod);
  }

}
