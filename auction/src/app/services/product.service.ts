import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>('/api/products/' + id);
  }

  public getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('/api/products/' + id + '/comments');
  }

  public getAllCategories(): string[] {
    return ['computer', 'ipad', 'software', 'hardware'];
  }

  public getProductsBySearch(params: ProductSearchParams) {
    return this.http.get<Product[]>('/api/products', {params: this.encodeParams(params)});
  }

  private encodeParams(params: ProductSearchParams): HttpParams {
    let result: HttpParams;
    result = Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: HttpParams, key: string) => {
        sum = sum.append(key, params[key]);
        return sum;
      }, new HttpParams());
    return result;
  }
}


export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {
  }
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {
  }
}
