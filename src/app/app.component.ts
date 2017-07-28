import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Checksheet } from '../pages/PreStartCheckSheet/initial';
import { profile } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userLoginName : any;
  userLoginId : any;

  pages: Array<{title: string, component: any, color: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, 'color': 'messages' },
      { title: 'Profile', component: profile, 'color': 'profile' },
      { title: 'Pre-Start Check List', component: Checksheet, 'color': 'logout' },
      { title: 'History', component: HistoryPage, 'color': 'messages' }
    ];

    storage.get('userId').then((val) => {
      console.log(val);
      if(val!=null)
      {
        storage.get('userId').then((val) => {
        this.userLoginId = val;
        });

        storage.get('userName').then((val) => {
          this.userLoginName = val;
        });
        this.rootPage = DashboardPage;
      }
      else
      {
        this.rootPage = LoginPage;
        //this.rootPage = DashboardPage;
      }

    });

    events.subscribe('user:created', (user, time) => {
            this.userLoginId = user;

    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signout(){
    this.storage.remove('userId');
    this.storage.remove('userName');
    this.storage.remove('userEmail');
    this.storage.remove('userPhone');

    this.nav.setRoot(LoginPage);
  }
}
