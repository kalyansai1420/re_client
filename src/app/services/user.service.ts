import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  //add user
  public addUser(user: any){
    return this.http.post(`${baseUrl}/user/`, user);
  }

  //get users
  public getUsers(){
    return this.http.get(`${baseUrl}/user/`);
  }

  //get one user
  public getOneUser(uId: any) {
    return this.http.get(`${baseUrl}/user/${uId}`);
  }

  //update user
  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/`, user);
  }

  //delete user
  public deleteUser(uId: any) {
    return this.http.delete(`${baseUrl}/user/${uId}`);
  }



}
