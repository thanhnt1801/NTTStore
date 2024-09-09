import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() productFromParent? : Product;
  
  constructor(private basketService : BasketService){}

  addItemToBasket()
  {
    this.productFromParent && this.basketService.addItemToBasket(this.productFromParent); // making sure we alway have an existing product    
  }

}
