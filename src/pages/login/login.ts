import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	username : any;
	password : any;
	constructor(public navCtrl: NavController, public menu: MenuController, public http: Http, private storage: Storage, public events: Events, public locationTracker: LocationTrackerProvider,private alertCtrl: AlertController) {
		this.menu = menu;
    	this.menu.enable(false, 'myMenu');
	}

	public login()
	{

		//this.locationTracker.stopTracking();

		var headers = new Headers();
	    headers.append("Accept", 'application/json');
	    headers.append('Content-Type', 'application/json' );
	    let options = new RequestOptions({ headers: headers });
		console.log(this.username+"-"+this.password);
		//let link = 'http://192.168.1.15/falconnect/falconnectwebsite/fmademo/public/loginapi';
		let link = 'http://falconnect.in/fmademo/public/loginapi';
		let credentials = {'email':this.username,'password':this.password};
		this.http.post(link,credentials,options).map(res => res.json()).subscribe( (data) =>  {
			console.log(data);
			if(data.Result==1)
			{
				this.storage.set('userId', data.user_id);
				this.storage.set('userName', data.user_name);
				this.storage.set('userEmail', data.user_email);
   				this.storage.set('userPhone', data.user_ph_no);
				this.events.publish('user:created', data.user_name, Date.now());
				this.navCtrl.setRoot(DashboardPage);
			}
			else{

				let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Invalid username or password',
              buttons: ['OK']
                });
             alert.present();

			}
		},
		(error) =>  {
			let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Unable to reach server. Try again later...',
              buttons: ['OK']
                });
             alert.present();

             		});

		this.menu.enable(true, 'myMenu');
	}

	

}
