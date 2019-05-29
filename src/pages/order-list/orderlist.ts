import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { Orders } from '../../providers/orders/orders';
import { Auth } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


@IonicPage({
  name: 'Order List',
  segment: 'Order List'
})

@Component({
  selector: 'order-list-page',
  templateUrl: 'orderlist.html'
})
export class OrderListPage {

  orders: any;
  loading: any;

  constructor(public navCtrl: NavController, public orderService: Orders, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad(){

    this.orderService.getOrders().then((data) => {
          this.orders = data;
          console.log(this.orders);
    }, (err) => {
        console.log("not allowed");
    });

  }

  deleteOrder(order){

    this.showLoader();

    //Remove from database
    this.orderService.deleteOrder(order._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
        let index = this.orders.indexOf(order);

        if(index > -1){
            this.orders.splice(index, 1);
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
  addOrder() {
    this.navCtrl.push("CreateOrderPage");
  }

  goHome() {
    this.navCtrl.setRoot("Home");
  }



}