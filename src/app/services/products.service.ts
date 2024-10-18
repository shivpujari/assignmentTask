import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'products';

  constructor() {
    // Load initial data into localStorage if it's not already there
    const storedProducts = localStorage.getItem(this.localStorageKey);
    if (!storedProducts) {
      const initialProducts: Product[] = [
        { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
        { id: 2, name: 'Product 2', price: 150, category: 'Category 2' },
        { id: 3, name: 'Product 3', price: 200, category: 'Category 3' },
      ];
      localStorage.setItem(this.localStorageKey, JSON.stringify(initialProducts));
    }
  }

  getProducts(): Observable<Product[]> {
    const products = localStorage.getItem(this.localStorageKey);
    return of(products ? JSON.parse(products) : []);
  }

  addProduct(product: Product): Observable<Product> {
    const products = this.getProductsFromLocalStorage();
    product.id = this.generateId(products);
    products.push(product);
    this.setProductsToLocalStorage(products);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    let products = this.getProductsFromLocalStorage();
    products = products.map(p => (p.id === product.id ? product : p));
    this.setProductsToLocalStorage(products);
    return of(product);
  }

  deleteProduct(id: number): Observable<Product[]> {
    let products = this.getProductsFromLocalStorage();
    products = products.filter(p => p.id !== id);
    this.setProductsToLocalStorage(products);
    return of(products);
  }

  // Helper methods
  private getProductsFromLocalStorage(): Product[] {
    const products = localStorage.getItem(this.localStorageKey);
    return products ? JSON.parse(products) : [];
  }

  private setProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
  }

  private generateId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}
