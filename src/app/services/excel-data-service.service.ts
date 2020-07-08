import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CheckerViewModel } from '../models/checker-view.model';
import ViewersData from '../mock-data/viewerData.json'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataService  {
  
  constructor(private _http: HttpClient) {
    //this.baseurl = environment.base_url;

  }

  getCheckerData(): Observable<CheckerViewModel[]>{
    // return this._http.get<CheckerViewModel[]>('test-data/checkerData.json');
    return this.getAll();
  }

  getViewerData(): Observable<CheckerViewModel[]>{
    // return this._http.get<CheckerViewModel[]>('test-data/checkerData.json');
    return this.getAll();
  }

  public getAll() : Observable<CheckerViewModel[]> {
    let checkerData: CheckerViewModel[] = [];
    return of(ViewersData);
  }

}