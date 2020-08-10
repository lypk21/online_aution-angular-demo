import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  rating: number;
  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();
  stars: number[];
  @Input()
  readonly: boolean = true;

  constructor() {

  }

  ngOnInit(): void {

  }

  clickStar(i): void {
    if (this.readonly) { return; }
    this.rating = i;
    this.ngOnInit();
    this.ratingChange.emit(this.rating);
  }

  ngOnChanges(): void {
    this.stars = [];
    const starFull = Math.floor(this.rating * 2) / 2;
    const starHalf = starFull % 1 !== 0;
    for (let i = 1; i <= starFull; i++) {
      this.stars.push(1);
    }
    if (starHalf) { this.stars.push(2); }
    while (this.stars.length < 5) {
      this.stars.push(0);
    }
  }

}
