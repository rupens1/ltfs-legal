import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataService } from './login-data.service';
import { RequestService } from '../services/request.service';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private loginDataService: LoginDataService, private request: RequestService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      psNo: new FormControl('', [
        Validators.maxLength(12),
        Validators.required,
      ]),
      password: new FormControl('')
    })
  }

  login() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      return alert('Invalid login credentials. Please check again')
    }

    const payload = {
      ...this.loginForm.value,
      reqId: '1234'
    }

    const requestOpt = {
      method: RequestMethod.Post,
    }


    this.request.makeRequest(payload, requestOpt, 'post')
      .subscribe(res => {
        this.loginDataService.userInfo = res
        switch (res.role) {
          case 'CHECKER':
            return this.router.navigate(['checker-dashboard']);
          case 'MAKER':
              return this.router.navigate(['dashboard']);
          case 'VIEWER':
            return this.router.navigate(['viewer-dashboard']);
          default:
            return this.router.navigate(['login'])
        }
      })

    // const { userName, password } = this.loginForm.value

    // this.loginDataService.userInfo = this.loginForm.value;
    // if (userName === users.ADMIN && password === users.PASSWORD) {
    //   return this.router.navigate(['checker-dashboard'])
    // }

    // if (userName === users.USER && password === users.PASSWORD) {
    //   return this.router.navigate(['dashboard'])
    // }

    // if (userName === users.VIEWER && password === users.PASSWORD) {
    //   return this.router.navigate(['viewer-dashboard'])
    // }

    alert('Unknown user')
  }

}
