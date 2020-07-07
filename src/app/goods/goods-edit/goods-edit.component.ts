import { Component, OnInit } from '@angular/core';
import { Mgoods, GoodStatus } from 'src/app/shared/models/goods.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsService } from 'src/app/shared/services/goods.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['./goods-edit.component.css']
})
export class GoodsEditComponent implements OnInit {

  id:number;
  good: Mgoods;
  goodForm: FormGroup; 
  GoodStatus= GoodStatus;
  disabledForms = false;

  constructor(private activatedRoute: ActivatedRoute, private goodsService: GoodsService, private router: Router) { 
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    })
  }

  ngOnInit(): void {
    this.getData();

    this.goodForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      status: new FormControl({value: 1, disabled: this.disabledForms},[Validators.required]),
    });
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let good = this.goodsService.getOneById(this.id);
        this.good = await good;
      } catch (err) {
        console.error(err);
      }
      this.goodForm.patchValue({
        name: this.good.name,
        amount: this.good.amount,
        status: this.good.status,
      });
    }
  }


  async onDelete() {
    try {
      await this.goodsService.deleteOneById(this.id);
    } catch (error) {
      console.error(error);
    }
    this.router.navigate(['/goods']);
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.goodsService.putOneById(this.id, this.goodForm.value);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let result = await this.goodsService.postOne(this.goodForm.value);

        this.router.navigate([this.router.url, result.id]);
        this.getData();
      } catch (error) {
        console.error(error);
      }
    }
    this.router.navigate(['/goods']);
  }

  
}
