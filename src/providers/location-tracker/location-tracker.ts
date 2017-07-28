import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Events } from 'ionic-angular';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTrackerProvider {
	public watch: any;    
  	public lat: any;
  	public lng: any;
  	public currentAddress: any;
 
  constructor(public zone: NgZone,public backgroundGeolocation: BackgroundGeolocation , public geolocation: Geolocation ,public http: Http ,public events:Events) {
     console.log('Hello LocationTrackerProvider Provider');
  }
 
  startTracking() {
 		let config = {
    	desiredAccuracy: 0,
    	stationaryRadius: 20,
    	distanceFilter: 10, 
    	debug: true,
    	interval: 60000 
  		};
 
  	this.backgroundGeolocation.configure(config).subscribe((location) => {
  		// Background Tracking
   	console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
   	 // Run update inside of Angular's zone
    	this.zone.run(() => {
      	this.lat = location.latitude;
      	this.lng = location.longitude;


      	 console.log('latitue',this.lat);
    	 console.log('longtitute',this.lng);

    	 this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.lng+'&sensor=true').map(res=>res.json()).subscribe(data => {
            var address = data.results[0];
            //this.locations=address.formatted_address;

            console.log(address.formatted_address);

            this.currentAddress=address.formatted_address;


            this.events.publish('location:created', address.formatted_address);

      		console.log('user location-->',address.formatted_address);

            });
    });
  }, (err) => {
    console.log(err);
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000, 
  enableHighAccuracy: true
  
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
  console.log(position);
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;

     this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.lng+'&sensor=true').map(res=>res.json()).subscribe(data => {
            var address = data.results[0];
            //this.locations=address.formatted_address;

            console.log(address.formatted_address);

            this.currentAddress=address.formatted_address;


            this.events.publish('location:created', address.formatted_address);

      		console.log('user location-->',address.formatted_address);

            });

     	console.log('latitue',this.lat);
    	 console.log('longtitute',this.lng);


		

   		let link = 'http://falconnect.in/fmademo/cassandra/locationapi';
		//let credentials = {'latitude':this.lat,'longitude':this.lng ,'user_id':'1'};

		let body = new FormData();
    	body.append("latitude", this.lat);
    	body.append("longitude", this.lng);
    	body.append("user_id", '1');
    	body.append("address", this.currentAddress);


		 this.http
        .post(link, body)
       // .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
            },
            err => {
              console.log("ERROR!: ", err);
            }
        );


		//this.http.post(link,body).map(res => res.json()).subscribe( (data) =>  {
			//console.log(data);
		//},
		//(error) =>  {
		//	alert('Unable to reach server. Try again later...');
		//});


  });
 
});
  }
 
  stopTracking() {
 
  console.log('stopTracking');
 
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();

 
  }
 

}
