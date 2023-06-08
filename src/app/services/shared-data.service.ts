import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  dataEvent: EventEmitter<any> = new EventEmitter<any>();
  private usersSubject = new Subject<any>();

  private propertySubject = new Subject<any>();
  constructor() {}

  setUsers(users: any) {
    this.usersSubject.next(users);
  }

  getUsers() {
    return this.usersSubject.asObservable();
  }
  setProperties(properties: any) {
    this.propertySubject.next(properties);
  }

  getProperties() {
    return this.propertySubject.asObservable();
  }
  
}
