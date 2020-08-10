import { Component, OnInit } from '@angular/core';
import {ProductService, Product} from '../services/product.service';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private  productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.getProductsBySearch(params)
    );
  }
}

