import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { Observable, of } from 'rxjs';
import { ExcelDataService } from '../services/excel-data-service.service';
import { CheckerViewModel } from '../models/checker-view.model';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss']
})
export class CheckerComponent implements OnInit {

  data$: Observable<CheckerViewModel[]>;

  constructor(private excelDataService: ExcelDataService) { }

  ngOnInit(): void {
    
    this.data$ = this.excelDataService.getCheckerData();
  }

  submitBatchID(data: any) {
    console.log(data);
  }

}


