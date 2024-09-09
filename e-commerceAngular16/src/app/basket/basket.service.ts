import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {
    
   }

  createPaymentIntent()
  {
    return this.http.post<Basket>(this.baseUrl + 'payments/' + this.getCurrentBasketValue()?.id, {})
      .pipe(map(basket => {
        this.basketSource.next(basket);
        console.log(basket);
      }));
  }

  setShippingPrice(deliveryMethod: DeliveryMethod)
  {
    const basket = this.getCurrentBasketValue();
    if(basket)
    {
      basket.shippingPrice = deliveryMethod.price;
      basket.deliveryMethodId = deliveryMethod.id;
      this.setBasket(basket);
    }
  }

  getBasket(id: string) : Subscription {
    return this.http.get<Basket>(this.baseUrl + "baskets?basketId=" + id).subscribe({
      next: basket => {
        this.basketSource.next(basket), 
        this.calculateBasketTotals()
      }
    });
  }

  setBasket(basket: Basket) : Subscription{
    return this.http.post<Basket>(this.baseUrl + "baskets", basket).subscribe({
      next: basket => {
        this.basketSource.next(basket), 
        this.calculateBasketTotals()
      }
    });
  }

  getCurrentBasketValue()
  {
    return this.basketSource.value;
  }

  private calculateBasketTotals()
  {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const subTotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0); //a = previous value, b = current value
    const total = subTotal + basket.shippingPrice;
    this.basketTotalSource.next({shipping: basket.shippingPrice, subTotal, total});
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    if(this.isProduct(item))
    {
      item = this.mapProductItemToBasketItem(item);
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity: number) {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === id);
    if(item)
    {
      item.quantity -= quantity;
      if(item?.quantity === 0) 
      {
        basket.items = basket.items.filter(x => x.id !== id); //making sure our basket items don't include item that equal to id
      }
      if(basket.items.length > 0)
      {
        this.setBasket(basket);
      }else {
        this.deleteBasket(basket);
      }
    }
  }
  
  deleteBasket(basket: Basket) {
    this.http.delete<Basket>(this.baseUrl + "Baskets?basketId=" + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket()
      }
    });
  }

  deleteLocalBasket(){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(i => i.id === itemToAdd.id);
    if(item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }
  
  createBasket(): Basket{
    const newBasket = new Basket();
    localStorage.setItem('basket_id', newBasket.id);
    return newBasket
  }


  private mapProductItemToBasketItem(item: Product) : BasketItem { //using for manually map product to basket item
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }

  private isProduct(item : Product | BasketItem) : item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
