import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuard } from './route.guard';
import { ViewReportComponent } from './view-report/view-report.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckerComponent } from './checker/checker.component';
import { ViewerComponent } from './viewer/viewer.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard] },
  {
    path: 'view-report',
    component: ViewReportComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'checker-dashboard',
    component: CheckerComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'viewer-dashboard',
    component: ViewerComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'view-report/product-details/:id',
    component: ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
