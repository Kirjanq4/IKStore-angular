import { Component, OnInit } from '@angular/core';
import { Category } from '../common/category';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productsCopy: Product[];
  searchText: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe((data) => {
      this.products = data;
      this.productsCopy = this.products.slice();
    });
  }

  listAllProducts() {
    this.products = this.productsCopy;
  }

  listAllBooks() {
    this.products = this.productsCopy;
    const books = this.products.filter((product) => {
      return product.category.id === 1;
    });
    this.products = books;
  }

  listAllElectronics() {
    this.products = this.productsCopy;
    const electronics = this.products.filter((product) => {
      return product.category.id === 2;
    });
    this.products = electronics;
  }

  listAllFurniture() {
    this.products = this.productsCopy;
    const furniture = this.products.filter((product) => {
      return product.category.id === 3;
    });
    this.products = furniture;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
