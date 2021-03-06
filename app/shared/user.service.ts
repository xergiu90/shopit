// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

import { Injectable } from "@angular/core";
import * as Kinvey from "kinvey-nativescript-sdk";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService as KinveyUserService } from "kinvey-nativescript-sdk/lib/angular";
import { User } from "./user.model";
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class UserService {
    private url= 'http://ec2-18-216-121-106.us-east-2.compute.amazonaws.com:8080/';
    public isStaff= false;
    constructor(private kinveyUserService: KinveyUserService,
                private http:  HttpClient
    ) { }

    register(user: User) {
        return this.kinveyUserService.signup({ email: user.email, password: user.password })
            .catch(this.handleErrors);
    }

    login(user: User) {
        return this.http.post(this.url+ 'api/auth/login/', { email: user.email, password: user.password })
            .pipe(
                map(
                    (data: User) => {
                        this.isStaff= data.is_staff;
                        return data;
                    }
                ),
                catchError(this.handleErrors)
            );
        
    }

    logout() {
        this.isStaff= false;
    }

    resetPassword(email) {
        return this.kinveyUserService.resetPassword(email)
            .catch(this.handleErrors);
    }

    handleErrors(error: Kinvey.Errors.BaseError) {
        console.error(error.message);
        return Promise.reject(error.message);
    }
}
