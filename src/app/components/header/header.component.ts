import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginDataService } from '../../login/login-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private loginDataService: LoginDataService) {
  }

  ngOnInit(): void {
  }

  openRoutes = ['/dashboard', '/viewer-dashboard', '/checker-dashboard']

  lastLogin = new Date()

  isAdmin() {
    // console.log(this.loginDataService.userInfo)
    return this.loginDataService.userInfo.userName === 'admin'
  }
  isLoggedIn() {
    // return true // temporary header for logout display
    return !this.openRoutes.find(openRoute => openRoute === this.router.url)
  }

  getReportLink() {
    switch (this.loginDataService.userInfo.role) {
      case 'MAKER':
        return '/view-report'
      case 'CHECKER':
        return '/checker-report'
      case 'VIEWER':
        return '/viewer-report'
      default:
        break;
    }
  }

  getDashboardLink() {
    switch (this.loginDataService.userInfo.role) {
      case 'MAKER':
        return '/dashboard'
      case 'CHECKER':
        return '/checker-dashboard'
      case 'VIEWER':
        return '/viewer-dashboard'
      default:
        break;
    }
  }

}
