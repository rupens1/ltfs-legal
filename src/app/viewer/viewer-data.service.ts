import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ViewerData from "../mock-data/viewerData.json";
import { CheckerViewModel } from '../models/checker-view.model';

@Injectable({
  providedIn: 'root'
})
export class ViewerDataService {

  constructor() { }

  private initViewerData = ViewerData
  private readonly _viewerData = new BehaviorSubject<CheckerViewModel[]>(this.initViewerData)

  readonly viewerData$ = this._viewerData.asObservable();

  
  public get viewerData() : CheckerViewModel[] {
    return this._viewerData.getValue()
  }

  
  public set viewerData(viewerData : CheckerViewModel[]) {
    this._viewerData.next(viewerData);
  }

  /**
   * addViewerData
   */
  public addViewerData(viewerData: CheckerViewModel) {
    this.viewerData = [
      ...this.viewerData,
      viewerData
    ]
  }

  /**
   * removeViewerData
   */
  public removeViewerData(id: number) {
    this.viewerData = this.viewerData.filter(({ batchId }) => batchId === id )
  }
  
  
}
