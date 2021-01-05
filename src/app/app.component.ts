import { Component } from '@angular/core';
import { SwPush} from '@angular/service-worker';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vapidKeys:string=`BEIWN2i8Nmy5TtmwvHR17T6DkeZseog-djS92NYRkEcaYFUDSytJAwudB6S9DBGQH4nZVbLJpEWIz_zvBLDmnN8`;
  payload=JSON.stringify({
    "notification": {
    "title": "Web Mail Notification",
    "body": "New Mail Received!",
    "icon": "images/bell.jpg",
    "vibrate": [100, 50, 100], //will cause the device to vibrate for 100 ms, be still for 50 ms, and then vibrate for 100 ms
    "requireInteraction":true,
    "data": {"dateOfArrival": Date.now(),},
    "actions": [{
    "action": "inbox",
    "title": "Go to Web Mail",
    }]
    }})

  constructor(private swPush: SwPush,private service:NotificationService){}

  ngOnInit(){

    if(navigator.serviceWorker){
// First, do a one-off check if there's currently a service worker in control.

  if (navigator.serviceWorker.controller) {
    console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
    navigator.serviceWorker.controller.onstatechange=function(){
      console.log('state'+ navigator.serviceWorker.controller.state);
    }
  } else {
    //This happens on ctrl+f5(force refresh)
    console.log('This page is not currently controlled by a service worker.');
    navigator.serviceWorker.register('./ngsw-worker.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
    window.location.reload();
    })
, function(error) {
      console.log('Service worker registration failed:', error);
    };
  }
  // Then, register a handler to detect when a new or
  // updated service worker takes control.
  navigator.serviceWorker.oncontrollerchange = function() {
    console.log('This page is now controlled by:', navigator.serviceWorker.controller);
  };
}
else {
  console.log('Service workers are not supported.');
}

  }

  test(){
    this.service.test().subscribe(x=>console.log(x));
  }

  triggerMessage()
  {
this.service.triggerMessage(this.payload).subscribe(x=>console.log(x),err=>console.log(err));
  }

  subscribeToNotifications() { 

    //True if the Service Worker is enabled (supported by the browser and enabled via ServiceWorkerModule).
    if(this.swPush.isEnabled){
      this.swPush.notificationClicks.subscribe(x=>console.log(x)); //triggers only on click
      //requestSubscription subscribes to Web Push Notifications, after requesting and receiving user permission.
    this.swPush.requestSubscription({
        serverPublicKey: this.vapidKeys
    })
    .then(sub =>{console.log(sub);this.service.subscribe(sub).subscribe(x=>console.log(x),err=>console.log(err))})
    .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
}
