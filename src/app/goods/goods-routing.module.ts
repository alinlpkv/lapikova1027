import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsComponent } from './goods.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsEditComponent } from './goods-edit/goods-edit.component';


const routes: Routes = [
  {
    path:'',
    component: GoodsComponent,
    children:[
      {
        path: '',
        component: GoodsListComponent
      },
      {
        path: 'profile',
        component: GoodsEditComponent
      },
      {
        path: 'profile/:id',
        component: GoodsEditComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule { }
