import { ProductComponent } from './home/product/product.component';
import { ProductService } from './shared/products.service';
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { KinveyModule, UserService as KinveyUserService } from "kinvey-nativescript-sdk/lib/angular";

import { UserService } from "./shared/user.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        KinveyModule.init({
            appKey: "kid_SyY8LYO8M",
            appSecret: "09282985d7c540f7b076a9c7fd884c77"
        })
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ProductComponent
    ],
    providers: [
        UserService,
        ProductService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
