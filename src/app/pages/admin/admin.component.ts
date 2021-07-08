import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../common/category';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  private categories: Category[] = [];

  private productsOfCategory: Product [] = [];


  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
        this.categories.forEach((c)=>{
          this.productService.findProductsInCategory(c.id).subscribe(p=>{
            c.products = p;
          })
        })
    })
  }

  getAllCategories() {

    return this.categories;

  }


}
