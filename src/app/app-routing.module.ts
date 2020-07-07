import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path:'goods',
    loadChildren: ()=> 
    import('./goods/goods.module').then(m=>m.GoodsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
