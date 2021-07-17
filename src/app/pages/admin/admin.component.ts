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

  categories: Category[] = [];

  private _categoryId: number;

  productModalIsHidden: boolean = true;

  categoryModalIsHidden: boolean = true;

  productName: string;

  productDescription: string;

  categoryName: string;

  price: string;


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

  showProductModal(id) {

    this.productModalIsHidden = false;
    this._categoryId = id;

  }

  createNewCategory() {
    let category = new Category();
    category.name = this.categoryName;
    category.products = [];
    this.categoryService.createNewCategory(category).subscribe(data=>{
      this.categories.unshift(data);
      console.log(data);
    })
  }

  addProductToCategory (categoryId) {

    let product = new Product();
    let category = new Category();
    category.id = categoryId;
    product.category = category;
    product.name = this.productName;
    product.description = this.productDescription;
    product.price = parseFloat(this.price);

    this.productService.addProductToCategory(product).subscribe(data=>{
      console.log(data);

      this.categories.filter((category)=>category.id === categoryId).forEach((cat)=>{
          cat.products.push(data);
      })
    });

  }


  hideProductModal() {
    this.productModalIsHidden = true;
  }

  showCategoryModal(){
    this.categoryModalIsHidden = false;
  }

  hideCategoryModal() {
    this.categoryModalIsHidden = true;
  }

  get categoryId(): number {
    return this._categoryId;
  }
}
