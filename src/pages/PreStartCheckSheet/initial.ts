import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';


@Component({
  selector: 'sheet',
  templateUrl: 'initial.html'
})
export class Checksheet {
  
  dailysheetData : any;
  userLoginId : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {

  	this.storage.get('userId').then((val) => {
        this.userLoginId = val;
        console.log(this.userLoginId);
  	});

  	var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let body = new FormData();
    console.log(body);

  	let link = 'http://falconnect.in/fmademo/public/prestartlist';
  	http.get(link).map(res => res.json()).subscribe( (data) =>  {
			console.log(data);
			if(data.Result==1)
			{
				this.dailysheetData = data.parameters;
			}
			else
			{
          alert('Unable to reach server. Try again later...');
	
             }
		},
		(error) =>  {
     alert('Unable to reach server. Try again later...');
             	});
  }

  public addCheckSheet(form)
  {

    this.pscs();
    
    var formData = new FormData($("form#dailysheetform")[0]);
    formData.append("userid", this.userLoginId);
    formData.append("checklist_type", '1');
    formData.append("equipmentNo", '1');
  
    var options = { 
          clearForm: true,
          resetForm: true
        };

    console.log(formData);
    
    $.ajax({
      url: 'http://falconnect.in/fmademo/cassandra/prechecklist.php',
      type:'post',
      data:  formData,
      async: false,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log(response);
        var obj = JSON.parse(response);
        console.log(obj.result);
        console.log('result-->',obj.result)
        console.log(obj);
        if(obj.result==1)
        {
          
        	alert('Inserted Succesfully');
          //this.navCtrl.push(HistoryPage);
        }
        else
        {
          
             alert('Operation failed');
        }
      },
      error: function (jqXHR, exception) {

            alert('Operation failed');

      },
      
    });
  }

public pscs()
  {
    this.navCtrl.setRoot(HistoryPage);
  }
public back()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

  
  
}
