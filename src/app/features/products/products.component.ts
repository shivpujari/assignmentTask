import { Component, HostListener, inject } from '@angular/core'
import { Product } from '../../interfaces/product.interface'
import { ProductService } from '../../services/products.service'
import { CommonModule } from '@angular/common'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { TableModule } from 'primeng/table'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogComponent, DialogModule, NgxChartsModule, ToastModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})
export class ProductsComponent {
  productService = inject(ProductService)
  messageService = inject(MessageService)
  products: Product[] = []
  selectedProduct: Product | null = null
  showDialog: boolean = false

  barChartData: any[] = []
  barChartConfig = {
    view: [350, 300] as [number, number],
    showXAxis: true,
    showYAxis: true,
    gradient: true,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Name',
    showYAxisLabel: true,
    yAxisLabel: 'Price',
    timeline: true,
    doughnut: true,
    colorScheme: {},
    showLabels: true
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartSize();
  }

  ngOnInit(): void {
    this.loadProducts()
    this.updateChartSize();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        if (products && products.length) {
          this.products = products
        }
        this.barChartData = products.map(product => ({
          name: product.name,
          value: product.price
        }));
      },
      error: (error: any) => {
        console.log(`getProducts() failed => `, error)
      }
    })
  }

  addProduct(product: Product): void {
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.loadProducts()
      },
      error: (error: any) => {
        console.log(`addProduct() failed => `, error)
      }
    })
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        this.loadProducts()
      },
      error: (error: any) => {
        console.log(`updateProduct() failed => `, error)
      }
    })
  }

  deleteProduct(id: any): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts()
      },
      error: (error: any) => {
        console.log(`deleteProduct() failed => `, error)
      }
    })
  }

  openDialog(product?: Product): void {
    this.selectedProduct = product || null
    this.showDialog = true
  }

  onDialogClosed(product: Product): void {
    if (!product?.id) {
      this.addProduct(product)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' })
      
    } else {
      this.updateProduct(product)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
    }
    this.showDialog = false
  }

  updateChartSize(): void {
    const width = window.innerWidth

    if (width <= 480) {
      this.barChartConfig.view = [300, 300]  // For small screens
    } else if (width <= 768) {
      this.barChartConfig.view = [500, 300]  // For medium screens
    } else {
      this.barChartConfig.view = [700, 400]  // For large screens
    }
  }
}
