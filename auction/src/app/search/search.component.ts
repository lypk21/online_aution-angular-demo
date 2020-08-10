import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel: FormGroup;
  categories: string[];

  constructor(private productService: ProductService) {
    const fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit(): void {
    this.categories = this.productService.getAllCategories();
  }

  positveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const price = parseInt(control.value);
    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }
  }
  onSearch(): void {
    if (this.formModel.valid) {
      this.productService.searchEvent.emit(this.formModel.value);
      console.log(this.formModel.value);
    }
  }
}
