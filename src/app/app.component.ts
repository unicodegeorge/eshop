import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Eshopi} from './eshopi';
import {Products} from './products';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eshop';
  token = new HttpHeaders();
  categories = [];
  products = [];
  openedDetails = [];
  numOfProduct: Number
  page:Number=1
  znacka: String
  pageCount: number;
  currentId: number;

  searchBar: string;



  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;


  }

  get cats() {
    return this.categories;
  }

  ngOnInit(): void {
    this.token = this.token.set('access-token', '8aa6bbb9-ffe4-4589-a061-a928459b3db5');
    this.getCategories();
    this.openedDetails.push("test");
  }

  toggleDetails(id) {

    var details = document.getElementById("details"+id);

    console.log(details);
    if(details.style.display === "none"){
      details.style.display = "block";
    } else {
      details.style.display  = "none";
    }
  }

  search(keyWord) {
    console.log("Keyword = " + keyWord);
    this.products = [];
    this.httpClient.get<Products>('/rest-api/api/categories/' + this.currentId, {headers: this.token}).subscribe((data) => {
      for(let i = 0; i < data.products.length; i++) {
        if(data.products[i].title.indexOf(keyWord) != -1) {
          this.products.push(data.products[i]);
        } else {

        }

        console.log(this.products);
      }


    });
  }

  getProducts(id) {
    this.currentId = id;
    this.httpClient.get<Eshopi>('/rest-api/api/categories/' + id, {headers: this.token}).subscribe((data) => {
      this.products = data.products;
      this.pageCount = data.pagesCount;


      console.log(this.pageCount);
      this.numOfProduct = data.products.length;
      console.log(this.numOfProduct);
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }



  getCategories() {


    this.httpClient.get<Eshopi>('/rest-api/api/categories', {headers: this.token}).subscribe((data) => {
      // @ts-ignore
      this.categories = data;
      console.log(this.categories);
    }, (error) => {
      console.log(error);
    });
  }


}
