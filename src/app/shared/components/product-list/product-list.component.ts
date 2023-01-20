import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output, SimpleChanges
} from '@angular/core'
import { Product } from '../../../core/models/product'
import { PaginationParams } from '../../../core/models/pagination-params'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Output() paginate: EventEmitter<PaginationParams> = new EventEmitter<PaginationParams>();

  constructor (private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges (changes: SimpleChanges) {
    if (changes['pageSize']) {
      this.currentPage = 1;
      this.emitPaginate();
    }

    if (changes['currentPage']) {
      this.emitPaginate();
    }

    this.changeDetectorRef.detectChanges();
  }

  trackByFn(index: number, product: Product) {
    return product.id;
  }

  canGoNext() {
    return this.products.length === this.pageSize;
  }

  canGoPrevious() {
    return this.currentPage > 1;
  }

  onPaginateNext() {
    if (this.canGoNext()) {
      this.currentPage++;
      this.changeDetectorRef.detectChanges();
      this.emitPaginate();
    }
  }

  onPaginatePrevious() {
    if (this.canGoPrevious()) {
      this.currentPage--;
      this.changeDetectorRef.detectChanges();
      this.emitPaginate();
    }
  }

  emitPaginate() {
    this.paginate.emit({
      offset: (this.currentPage - 1) * this.pageSize,
      limit: this.pageSize
    });
  }
}
