import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;
  

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
  }

  listProducts(){
      this.searchMode = this.route.snapshot.paramMap.has('keyword'); 

      if(this.searchMode){
        this.handleSearchProducts();

      }else {
        this.handleListProducts();
      }

      
  }
  handleSearchProducts() {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

      if(this.previousKeyword != theKeyword){
        this.thePageNumber = 1;
      }

      this.previousKeyword = theKeyword;



      //search products by the keyword
      this.productService.searchProductsPagination(this.thePageNumber -1, this.thePageSize, theKeyword).subscribe(this.processResult());


  }

  handleListProducts(){

     // is de Id param meegegeven?
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if(hasCategoryId){
       // convert id string param to number (by using the + symbol)
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
     } else {
       // als er geen id meegegeven wordt dan.. standaard: category 1 wordt weergeven
       this.currentCategoryId = 1;
     }

     //check if the current cat id is different from the previous


     if(this.previousCategoryId != this.currentCategoryId){
       this.thePageNumber = 1;
     }

     this.previousCategoryId = this.currentCategoryId;
     console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
 
     // weergeef de producten met de juiste id
     this.productService.getProductListPagination(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());
  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

}
