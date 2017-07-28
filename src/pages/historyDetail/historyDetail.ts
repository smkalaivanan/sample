import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'sheet',
  templateUrl: 'historyDetail.html'
})
export class HistoryDetail {
  
  historyData : any;
  userLoginId : any;
  site : any;
  eName : any;
  eId : any;
  plant : any;
  operator : any;
  hours : any;
    history : any;

  


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage,private alertCtrl: AlertController) {

      this.history = navParams.get('history');

      console.log('item',this.history);

      console.log('item',this.history.psid);


  	this.storage.get('userId').then((val) => {
        this.userLoginId = val;
        console.log(this.userLoginId);
  	});

  	var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
    let link = 'http://falconnect.in/fmademo/public/checklistviewapi';
    let credentials = {'checklists_id':this.history};
    this.http.post(link,credentials,options).map(res => res.json()).subscribe( (data) =>  {
      console.log(data);
      {
          this.site=data.site_address;
          this.eName=data.equipment_name;
          this.eId=data.equipment_id;
          this.plant=data.plant;
          this.operator=data.operator;
          this.hours=data.hourskm;

          this.historyData = data.data;
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
  }

  
}
