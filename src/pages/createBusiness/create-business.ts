import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Businesses } from '../../providers/businesses/businesses';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth/auth'

/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Add Business',
  segment: 'businesses/create',
})
@Component({
  selector: 'page-create-business',
  templateUrl: 'create-business.html',
})
export class CreateBusinessPage {
  name: any;
  price: number;
  loading: any;
  showLoader: any;
  fiftyPerm: any;
  charity: any;
  charityPercent: any;
  businessOwners: any;
  fiftyDollarPermission: any;

  constructor(public navCtrl: NavController, public businessService: Businesses, public loadingCtrl: LoadingController, public authService: Auth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBusinessPage');
  }

  createBusiness(){


    let businessDetails = {
        name: this.name,
        fiftyDollarPermission: this.fiftyDollarPermission,
        charity: this.charity,
        charityPercent: this.charityPercent,
        businessOwners: this.businessOwners
    };

    this.businessService.createBusiness(businessDetails).then((result) => {
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