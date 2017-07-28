import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class profile {

  profileName : any;
  profileEmail : any;
  profilePhone : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {
    this.storage.get('userName').then((val) => {
      this.profileName = val;
    });
    this.storage.get('userEmail').then((val) => {
      this.profileEmail = val;
    });
    this.storage.get('userPhone').then((val) => {
      this.profilePhone = val;
    });
  }

public logout()
  {
    this.storage.remove('userId');
    this.storage.remove('userName');
    this.storage.remove('userEmail');
    this.storage.remove('userPhone');

    this.navCtrl.setRoot(LoginPage);
  }
  
  
}
