import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import {catchError, map} from 'rxjs/operators';
@Injectable()
export class ProductService {
    private url= 'http://ec2-18-216-121-106.us-east-2.compute.amazonaws.com:8080/';
    constructor(private http:  HttpClient){

    }

    sendProduct(shopping_cart:number, product: string, quantity:number){
        return this.http.post(this.url+ 'api/products/', { shopping_cart, product, quantity })
        .pipe(
            catchError(this.handleErrors)
        );
    }

    createCart(){
        return this.http.post(this.url+ 'api/cart/',{})
        .pipe(
            catchError(this.handleErrors)
        );
    }

    handleErrors(error) {
        console.error(error.message);
        return Promise.reject(error.message);
    }
}