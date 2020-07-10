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

  navigateUser(role: string): Promise<boolean> {
    switch (role) {
      case 'CHECKER':
        return this.router.navigate(['checker-dashboard']);
      case 'MAKER':
          return this.router.navigate(['dashboard']);
      case 'VIEWER':
        return this.router.navigate(['viewer-dashboard']);
      default:
        alert('We couldn\'t Verify your identity please check your creds and try again')
        return this.router.navigate(['login'])
    }
  }

  login() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      return alert('Invalid login credentials. Please check again')
    }

    const reqId =  Math.floor(1000 + Math.random()*9000)
    const payload = {
      ...this.loginForm.value,
      reqId,
    }

    const requestOpt = {
      method: RequestMethod.Post,
    }


    this.request.makeRequest(payload, requestOpt, 'post')
      .subscribe(res => {
        this.loginDataService.userInfo = res
        if (res.token && res.status === 200 && reqId ===  res.reqId) {
          return this.navigateUser(res.role)
        }
        
      }, err => {
        console.error(err)
        alert('Something went wrong please try again')
      })

  }

}
