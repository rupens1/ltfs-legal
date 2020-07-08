import { Component, OnInit } from '@angular/core';
import { ExcelDataService } from '../services/excel-data-service.service';
import { Observable } from 'rxjs';
import { CheckerViewModel } from '../models/checker-view.model';
import { ViewerDataService } from './viewer-data.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  constructor(public viewerDataStore: ViewerDataService) { }

  ngOnInit(): void {}

}
