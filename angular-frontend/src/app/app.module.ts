import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OAuthModule } from 'angular-oauth2-oidc';

import AppConfig from '../app/config/appconfig';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

const otkaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);
    router.nagivate(['/login']);
  }
}, AppConfig.oidc);




const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'category/:id', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**', redirectTo: '/products', pathMatch: 'full'},

];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    OAuthModule.forRoot()
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: otkaConfig }],
  bootstrap: [AppComponent]
})


export class AppModule { }
