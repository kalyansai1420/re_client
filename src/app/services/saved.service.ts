import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  constructor(
    private _http: HttpClient
  ) { }


  //add property to saved
  public addPropertytoSaved(propertySave:any) {
    return this._http.post(`${baseUrl}/saved`, propertySave);
  }

  //remove property from saved
  public removePropertyfromSaved(saveId: any) { 
    return this._http.delete(`${baseUrl}/saved/${saveId}`)
  }

  //get saved property from user
  public getSavedProperty(id: any) {
    return this._http.get(`${baseUrl}/saved/user/${id}`)
  }


}
