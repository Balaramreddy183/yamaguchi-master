import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetService {
public product_api = "https://dummyjson.com/products";
  constructor( public httpClient:HttpClient  ) {

   }
   getGallery(){
    return this.httpClient.get(this.product_api);
   }

   getEvents(){
    return this.httpClient.get(this.product_api);
   }

   getTrainers(){
    return this.httpClient.get(this.product_api);
   }
}
