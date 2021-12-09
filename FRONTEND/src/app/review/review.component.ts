
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../auth-service.service';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  @Input() product: Product;
  @Input() bool: boolean;

  constructor(private fun: FunctionsService) { }

  ngOnInit() {
  }

}
