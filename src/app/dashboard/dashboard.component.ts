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
  productsType = {
    HOMELOAN: { 
      typeOfLetter: [
        { value: 'LRN', name: 'LRN Notice' },
        { value: 'DUNNING', name: 'Dunning Notice' }
      ],
      category: [
        { value: 'HARD_DUNNING', name: 'Hard Dunning' },
        { value: 'SOFT_DUNNING', name: 'Soft Dunning' }
      ]
    },
    TWOWHEELER: {
      typeOfLetter: [
        { value: 'LRN', name: 'LRN Notice' },
        { value: 'DUNNING', name: 'Dunning Notice' }
      ],
      category: [
        { value: 'HARD_DUNNING', name: 'Hard Dunning' },
        { value: 'SOFT_DUNNING', name: 'Soft Dunning' }
      ]
    },
    FARMLOAN: {
      typeOfLetter: [
        { value: 'DUNNING', name: 'Dunning Notice' }
      ],
      category: [
        { value: 'one_br', name: 'One BR' },
        { value: 'one_br_gr', name: 'One BR + One GR' },
        { value: 'one_br_cbr_gr', name: 'One BR + One CBR + One GR' }
      ]
    }
  }
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

  getOptions(optionsType: string) {
    const selectedProduct = this.dashboardForm.get('products').value
    return this.productsType?.[selectedProduct]?.[optionsType] || []
  }



  submitData() {
    console.log(this.dashboardForm)
    if (this.dashboardForm.valid && this.dashboardForm.touched) {
      alert('File submitted successfully!')
    } else {
      alert('Please Fill the form correctly')
    }
  }

}
