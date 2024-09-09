import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  count? = 0;
  constructor(public basketService: BasketService, 
    public accountService : AccountService,
    private router: Router){
  }

  
  getCount(items: BasketItem[]) {
    // var totalQuantities : number = 0;
    // items.forEach((item) => {
    //   totalQuantities += item.quantity
    // });
    // return totalQuantities;

    //====================

    // 1.
    // function sumQUantities(sum : number, item: BasketItem)
    // {
    //   return sum + item.quantity;
    // }

    // 2.
    // const sumQUantities = (sum: number, item: BasketItem) => sum + item.quantity;

    // return items.reduce(sumQUantities, 0);

    // 3.
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
