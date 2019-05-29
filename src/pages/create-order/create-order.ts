import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Orders } from '../../providers/orders/orders';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth/auth'
import { Products } from '../../providers/products/products';

/**
 * Generated class for the CreateOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'CreateOrderPage',
  segment: 'orders/create',
})
@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html',
})
export class CreateOrderPage {
  name: any;
  business: number;
  price: number;
  loading: any;
  showLoader: any;
  businesses: {};
  products: {};
  product: any;
  quantity: any;

  constructor(public navCtrl: NavController, public orderService: Orders, public productService: Products, public loadingCtrl: LoadingController, public authService: Auth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOrderPage');
  
    this.productService.getProducts().then((data) => {
      this.products = data;
    }, (err) => {
      console.log("User not permitted to access product list");
    });
  }

  createOrder(){


    let orderDetails = {
        product: this.product,
        quantity: this.quantity
    };

    this.orderService.createOrder(orderDetails).then((result) => {
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
 /* addorder(){

    let prompt = this.alertCtrl.create({
      title: 'Add order',
      message: 'Describe your order below:',
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
          handler: order => {

                if(order){

                    this.showLoader();

                    this.orderService.createOrder(order).then((result) => {
                        this.loading.dismiss();
                        this.orders = result;
                        console.log("order created");
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