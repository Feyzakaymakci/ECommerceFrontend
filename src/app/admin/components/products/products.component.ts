import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
  httpClientService: any;

  constructor(spinner:NgxSpinnerService) {
    super(spinner);

  }
  ngOnInit(): void {
    
  }

@ViewChild(ListComponent)listComponents : ListComponent;

createdProduct(createdProduct: Create_Product) {
  this.listComponents.getProducts();
  }
}