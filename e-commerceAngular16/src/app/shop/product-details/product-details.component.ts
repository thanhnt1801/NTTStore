import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product?: Product;
  quantity: number = 1;
  quantityInBasket: number = 0;
  constructor(private shopService: ShopService, 
    private activeRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService){
      this.bcService.set('@productDetails', ' ');
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct()
  {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: response => {
        this.product = response,
        this.bcService.set('@productDetails', this.product.name),
        
        this.basketService.basketSource$.pipe(take(1)).subscribe({ //using for display quantity of item match in basket
          next: basket => {
            const item = basket?.items.find(x => x.id === +id);
            if(item)
            {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        });

      },
      error: error => console.log(error)
    })
  }

  incrementQuantity()
  {
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 0)
    {
      this.quantity--;
    }
  }

  updateBasket()
  {
    if(this.product) //because of strict mode, so we need to check product is existing, not undefined
    {
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = (this.quantity - this.quantityInBasket);
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd)
      }else {
        const itemsToRemove = (this.quantityInBasket - this.quantity);
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText(){
    return this.quantityInBasket === 0 ? "Add to basket" : "Update basket";
  }

}
