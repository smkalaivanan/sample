import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Checksheet } from '../PreStartCheckSheet/initial';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { HistoryDetail } from '../historyDetail/historyDetail';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  
  address:any;
  historyData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http ,public events:Events, public locationTracker: LocationTrackerProvider ,private alertCtrl: AlertController) {
    this.storage.get('userId').then((val) => {

        this.locationTracker.startTracking();

        //this.userLoginId = val;
        var credentials = {'user_id':val,'checklist_type':'1'};
        let link = 'http://falconnect.in/fmademo/public/checklistapi';
        http.post(link,credentials).map(res => res.json()).subscribe( (data) =>  {
          console.log(data);
          if(data.Result==1)
          {
            this.historyData = data.data;
          }
          else
          {
              let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'no data found',
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

      events.subscribe('location:created', (user) => {

      console.log('user dashboard-->',user);
      this.address=user;
      });
    });
  }

  public pscs()
	{
		this.navCtrl.setRoot(Checksheet);
	}

   itemTapped(psid) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HistoryDetail,{history : psid});
  }

}
