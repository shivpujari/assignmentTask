import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { MockDialogComponent } from '../mock-dialog/mock-dialog.component';

@Component({
  selector: 'app-mock',
  standalone: true,
  imports: [MockDialogComponent],
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.scss'
})
export class MockComponent {
  productService = inject(ProductService)
  product: Product[] = []
  showDialog: boolean = false
  selectedProduct: Product | null = null
  @Output() passDatatoParent = new EventEmitter<string>();

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.product = products
      }, error(err) {
        console.log(err)
      },
    })
  }

  addProduct(product: Product): void {
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.getProducts()
      }, error(err) {
        console.log(err)
      },
    })
  }

  openDialog(product?: Product) {
    this.selectedProduct = product || null
    this.showDialog = true
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        this.getProducts()
      }, error(err) {
        console.log(err)
      },
    })
  }

  deleteProduct(product: number): void {
    this.productService.deleteProduct(product).subscribe({
      next: () => {
        this.getProducts()
      }, error(err) {
        console.log(err)
      },
    })
  }

  onDialogClosed(product: Product): void {
    if (!product?.id) {
      this.addProduct(product)
    } else {
      this.updateProduct(product)
    }
    this.showDialog = false
  }

  sendData(): void {
    this.passDatatoParent.emit("Hello form Child Component")
  }
}
