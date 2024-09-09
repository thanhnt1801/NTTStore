import * as cuid from "cuid"

  
export interface BasketItem {
  id: number
  productName: string
  price: number
  quantity: number
  pictureUrl: string
  brand: string
  type: string
}

export interface IBasket {
  id: string;
  items: BasketItem[];
}


export class Basket implements IBasket {
  id = cuid();
  items: BasketItem[]= [];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice = 0;
}

export interface BasketTotal{
  shipping: number;
  subTotal: number;
  total: number;
}