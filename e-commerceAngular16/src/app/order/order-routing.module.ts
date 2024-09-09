import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routes : Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', component: OrderDetailedComponent, data: {breadcrumb: {alias: 'orderDetailed'}}},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
