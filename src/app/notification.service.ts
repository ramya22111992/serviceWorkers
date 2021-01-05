import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  subscribe(subscription:any)
  {
    //post requests or any mutating requests wont be cached
return this.http.post(environment.baseUrl+'subscribe',subscription).pipe(map(res=>res));
  }

  triggerMessage(message){
    return this.http.post(environment.baseUrl+'message',JSON.parse(message)).pipe(map(res=>res));
  }

  test()
  {
    return this.http.get(environment.baseUrl+'test').pipe(map(res=>res));
  }
}
