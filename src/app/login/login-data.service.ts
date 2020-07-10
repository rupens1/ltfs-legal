import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  constructor() { }

  private initialUserValue = {
    psNo: null,
    password: null,
    role: null,
    statusCode: null,
    reqId: null,
    token: null,
    custName: null
  }
  private readonly userData = new BehaviorSubject<User>(this.initialUserValue)

  readonly userInfo$ = this.userData.asObservable();

  
  public get userInfo() : User {
    return this.userData.getValue()
  }

  
  public set userInfo(userValue : User) {
    this.userData.next(userValue);
  }
  
  
}


interface User {
  psNo: string
  password: string
  role: string,
  token: string,
  reqId: string,
  statusCode: number,
  custName: string
}