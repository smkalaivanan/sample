import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Checksheet } from '../PreStartCheckSheet/initial';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, equipment: string, equipmentId: string, time: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    // If we navigated to this page, we will have an item available as a nav param
     this.selectedItem = navParams.get('item');
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'PSCS 12930' + i,
        equipment:'Compartment 93821' + i,
        equipmentId:'3127873128' + i,
        time:  i + ' day ago',
      });
    }
  }

  public pscs()
	{
		this.navCtrl.setRoot(Checksheet);
	}

}
