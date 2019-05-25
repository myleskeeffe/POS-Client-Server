import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { Businesses } from '../../providers/businesses/businesses';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage({
  name: 'Business List',
  segment: 'businesses/list'
})


@Component({
  selector: 'business-list-page',
  templateUrl: 'businesslist.html'
})
export class BusinessListPage {

  businesses: any;
  loading: any;

  constructor(public navCtrl: NavController, public businessService: Businesses, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){

    this.businessService.getBusinesses().then((data) => {
          this.businesses = data;
    }, (err) => {
        console.log("User not permitted to get businesses.");
    });

  }

  deleteProduct(business){

    this.showLoader();

    //Remove from database
    this.businessService.deleteBusiness(business._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
        let index = this.businesses.indexOf(business);

        if(index > -1){
            this.businesses.splice(index, 1);
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
  addBusiness() {
    this.navCtrl.push("Add Business");
  }
}