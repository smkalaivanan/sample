import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-psclist',
  templateUrl: 'psclist.html'
})
export class PsclistPage {
	testRadioOpen: boolean;
  	testRadioResult;
	constructor(public alerCtrl: AlertController) {

	}

  showRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Choose Option');

    alert.addInput({
      type: 'radio',
      label: 'Yes',
      value: 'blue',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'No',
      value: 'green'
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }

}
