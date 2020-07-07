import { Component, OnInit } from '@angular/core';
import { Mgoods } from 'src/app/shared/models/goods.model';
import { GoodsService } from 'src/app/shared/services/goods.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {
  goods: Mgoods[];

  constructor(private goodsrServise: GoodsService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let goods = this.goodsrServise.getAll();
    //  console.log(workers)
      this.goods = isNullOrUndefined(await goods) ? [] : await goods;
      this.notBoughtSort();
    } catch (err) {
      console.log(err);
    }

  }

  async onDeleteById(id: number) {
    try {
      await this.goodsrServise.deleteOneById(id);
    } catch (err) {
      console.log(err);
    } finally {
      this.getData();
    }
  }

  onChangeStatus(id: number){
    for(let i=0; i<this.goods.length; i++){
      if (id==this.goods[i].id){
        let index=i;
        if(this.goods[i].status == 0) this.goods[i].status=1
        else this.goods[i].status=0;
        this.goodsrServise.putOneById(id, this.goods[index]);
      }
    }
    this.notBoughtSort();
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }


  abcSort(){
    this.goods.sort(function (a, b) {
      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }
  
  notBoughtSort(){
    this.goods.sort(function (a, b) {
      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;
    });
  }

}
