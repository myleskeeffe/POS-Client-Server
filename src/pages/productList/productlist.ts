import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { Products } from '../../providers/products/products';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage({
  name: 'Product List',
  segment: 'list/products'
})


@Component({
  selector: 'product-list-page',
  templateUrl: 'productlist.html'
})
export class ProductListPage {

  products: any;
  loading: any;

  constructor(public navCtrl: NavController, public productService: Products, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){

    this.productService.getProducts().then((data) => {
          this.products = data;
    }, (err) => {
        console.log("not allowed");
    });

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
}