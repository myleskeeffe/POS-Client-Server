import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Auth } from '../providers/auth/auth';
import { Products } from '../providers/products/products';
import { Businesses } from '../providers/businesses/businesses';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { HttpModule } from '@angular/http';
import { HomePageModule } from '../pages/home/home.module';
import { CreateProductPage} from '../pages/create-product/create-product';
import { CreateProductPageModule } from '../pages/create-product/create-product.module';
import { ProductListPage } from '../pages/productList/productlist';
import { ProductListModule } from '../pages/productList/productlist.module';
import { BusinessListPage } from '../pages/businessList/businesslist';
import {BusinessListModule } from '../pages/businessList/businesslist.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    HttpModule,
    HomePageModule,
    CreateProductPageModule,
    ProductListModule,
    BusinessListModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateProductPage,
    ProductListPage,
    BusinessListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    Products,
    Businesses
  ]
})
export class AppModule {}
