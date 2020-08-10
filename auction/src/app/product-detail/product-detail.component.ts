import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../services/product.service';
import {WebSocketService} from '../services/web-socket.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  comments: Comment[];
  newComment = '';
  newRating = 5;
  isCommentHidden = true;
  isWatched = false;
  currentBid: number;
  subscription: Subscription;

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService, private webSocketService: WebSocketService) {

  }

  ngOnInit(): void {
    const productId: number = this.routeInfo.snapshot.params.productId;
    this.productService.getProductById(productId).subscribe( product => {
      this.product = product;
      this.currentBid = product.price;
    });
    this.productService.getCommentsForProductId(productId).subscribe(comments => this.comments = comments);
  }

  addComment(): void {
    const comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);
    // tslint:disable-next-line:no-shadowed-variable
    const sum = this.comments.reduce((sum: number, comment: Comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }
  watchProduct(): void {
    this.isWatched = !this.isWatched;
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription =  null;
    } else {
      this.isWatched = true;
      this.subscription = this.webSocketService.createObservableSocket('ws://localhost:8085', this.product.id)
        .subscribe(
          products => {
            const product = products.find(p => p.productId === this.product.id);
            this.currentBid = product.bid;
          }
        );
    }
  }
}
