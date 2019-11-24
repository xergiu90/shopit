import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import {catchError, map} from 'rxjs/operators';
import { Cart } from './user.model';
@Injectable()
export class ProductService {
    private url= 'http://ec2-18-216-121-106.us-east-2.compute.amazonaws.com:8080/';
    public shopping_cart= null;
    constructor(private http:  HttpClient){

    }

    addToStock( product: string){
        return this.http.post(this.url+ 'api/products/', { product })
        .pipe(
            catchError(this.handleErrors)
        );
    }

    sendProduct( product: string, quantity:number, shopping_cart=this.shopping_cart){
        return this.http.post(this.url+ 'api/cart-item/', { product, quantity, shopping_cart })
        .pipe(
            catchError(this.handleErrors)
        );
    }

    createCart(){
        return this.http.post(this.url+ 'api/cart/',{})
        .pipe(
            map( (data:Cart)=> {
                this.shopping_cart= data.id;
            }),
            catchError(this.handleErrors)
        );
    }

    handleErrors(error) {
        console.error(error.message);
        return Promise.reject(error.message);
    }
}
