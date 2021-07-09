import { Component, OnInit } from '@angular/core';
import { Category } from '../common/category';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productsCopy: Product[];
  searchText: string;
  message:string;
  isUser: boolean;
  selection:string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.authService.authentication.subscribe((data) => {
      this.isUser = !!data;
    });
    this.productService.findAll().subscribe((data) => {
      this.products = data;
      this.productsCopy = this.products.slice();
    });
  }

  listAllProducts() {
    this.products = this.productsCopy;
    this.selection = 'all';
  }

  listAllBooks() {
    this.products = this.productsCopy;
    const books = this.products.filter((product) => {
      return product.category.id === 1;
    });
    this.products = books;
    this.selection = 'books';
  }

  listAllElectronics() {
    this.products = this.productsCopy;
    const electronics = this.products.filter((product) => {
      return product.category.id === 2;
    });
    this.products = electronics;
    this.selection = 'electronics';
  }

  listAllFurniture() {
    this.products = this.productsCopy;
    const furniture = this.products.filter((product) => {
      return product.category.id === 3;
    });
    this.products = furniture;
    this.selection = 'furniture';
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
