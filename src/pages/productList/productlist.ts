import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { Products } from '../../providers/products/products';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Businesses } from '../../providers/businesses/businesses';

@IonicPage({
  name: 'Product List',
  segment: 'productlist'
})


@Component({
  selector: 'product-list-page',
  templateUrl: 'productlist.html'
})
export class ProductListPage {

  products: any;
  loading: any;
  businessdata: any;
  businessdat: any;
  businessdeets: any;

  constructor(public navCtrl: NavController, public productService: Products, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public businessService: Businesses) {

  }

  ionViewDidLoad(){

    this.productService.getProducts().then((data) => {
          this.products = data;
          let x = 0;
          for (let iProduct of this.products) {
            this.businessService.findBusiness(iProduct.business).then((businessDeets) => {
              console.log(businessDeets[0].name);
              iProduct.businessd = businessDeets[0].name;
            });
         
          }
    }, (err) => {
        console.log("Could not fetch products. Try signing in again.");
    });

  }


  findBusiness(businessid){
    this.businessService.findBusiness(businessid).then((data3) => {
      this.businessdeets = data3[0].name
    })
    return(this.businessdeets)
  }


  deleteProduct(product){

    this.showLoader();

    //Remove from database
    this.productService.deleteProduct(product._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
        let index = this.products.indexOf(product);

        if(index > -1){
            this.products.splice(index, 1);
        }   

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }
  addProduct() {
    this.navCtrl.push("CreateProductPage");
  }

  goHome() {
    this.navCtrl.setRoot("Home");
  }



}