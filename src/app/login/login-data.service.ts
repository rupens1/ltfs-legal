import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  constructor() { }

  private initialUserValue = { userName: '', password: '', role: ''}
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
  userName: string
  password: string
  role: string
}