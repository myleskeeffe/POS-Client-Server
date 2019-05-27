import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Products } from '../../providers/products/products';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth/auth'
import { Businesses } from '../../providers/businesses/businesses';

/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'CreateProductPage',
  segment: 'createproduct',
})
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  name: any;
  business: number;
  price: number;
  loading: any;
  showLoader: any;
  businesses: {};

  constructor(public navCtrl: NavController, public productService: Products, public businessService: Businesses, public loadingCtrl: LoadingController, public authService: Auth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  
    this.businessService.getBusinesses().then((data) => {
      this.businesses = data;
    }, (err) => {
      console.log("User not permitted to access business list");
    });
  }

  createProduct(){


    let productDetails = {
        name: this.name,
        business: this.business,
        price: this.price
    };

    this.productService.createProduct(productDetails).then((result) => {
        console.log(result);
        this.navCtrl.setRoot(HomePage);
    }, (err) => {
        console.log(err);
    });

  }


  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }

  goHome(){
    this.navCtrl.setRoot('Home');
  }




}
 /* addproduct(){

    let prompt = this.alertCtrl.create({
      title: 'Add product',
      message: 'Describe your product below:',
      inputs: [
        {
          name: 'name',
          name1: 'business',
          name2: 'price'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: product => {

                if(product){

                    this.showLoader();

                    this.productService.createProduct(product).then((result) => {
                        this.loading.dismiss();
                        this.products = result;
                        console.log("product created");
                    }, (err) => {
                        this.loading.dismiss();
                        console.log("not allowed");
                    });

                }


          }
        }
      ]
    });

    prompt.present();

  } */