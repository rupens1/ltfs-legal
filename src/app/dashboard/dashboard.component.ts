import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dashboardForm = this.fb.group({
      products: new FormControl('', [
        Validators.required,
      ]),
      typeOfLetter: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      communicationType: new FormControl('', [
        Validators.required,
      ]),
      uploadExcelFile: new FormControl('', [
        Validators.required,
      ])
    })
  }

  submitData() {
    alert('File submitted successfully!')
  }

}
