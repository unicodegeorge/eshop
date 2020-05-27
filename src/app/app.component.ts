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
  parameters = [];
  numOfProduct: Number
  page:Number=1
  znacka: String
  pageCount: number;




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



  getProducts(id) {

    this.httpClient.get<Products>('/rest-api/api/categories/' + id, {headers: this.token}).subscribe((data) => {
      this.products = data.products;
      this.pageCount = data.pagesCount;


      console.log(this.pageCount);
      this.numOfProducts = data.products.length;
      console.log(this.numOfProducts);
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
