import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from '../auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Orders {

  constructor(public http: Http, public authService: Auth) {

  }

  getOrders(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('http://api.runway.pos.keeffes.com:8080/api/orders', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createOrder(order){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://api.runway.pos.keeffes.com:8080/api/orders', JSON.stringify(order), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteOrder(id){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Authorization', this.authService.token);

        this.http.delete('http://api.runway.pos.keeffes.com:8080/api/orders/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    

    });

  }

}