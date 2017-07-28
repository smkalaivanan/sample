import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HistoryDetail } from '../historyDetail/historyDetail';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  historyData : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http,private alertCtrl: AlertController) {
    this.storage.get('userId').then((val) => {
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
    });
    
   
  }

  itemTapped(psid) {
  
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HistoryDetail,{history : psid});
  }

}
