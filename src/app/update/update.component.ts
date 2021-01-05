import { Component, OnInit } from '@angular/core';
import {SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private SwUpdate:SwUpdate) { }

  ngOnInit() {
    if(this.SwUpdate.isEnabled){
      this.SwUpdate.available.subscribe(x=>{
        if(confirm("A new update to app is available. Update?")){
          this.updateApp()
        }
      })
      this.SwUpdate.activated.subscribe(x=>alert("You are now viewing a new version of the app"))
      }
    
  }

  updateApp()
  {
    this.SwUpdate.activateUpdate()
    .then(() => window.location.reload()) //new version will be available on reload
    .catch((err)=>console.log(err))
  }


}
