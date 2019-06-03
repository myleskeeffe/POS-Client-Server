import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'Signup',
  segment: 'signup'
})
@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {

  role: string;
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  register(){

    this.showLoader();

    let details = {
        email: this.email,
        password: this.password,
        role: this.role
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  goHome() {
    this.navCtrl.setRoot("Home");
  }

}