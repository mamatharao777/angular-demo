import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeLandingComponent} from './home-landing/home-landing.component';
import {EmployeeComponent} from './employee/employee.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule} from '@angular/forms';
import {DataService} from './data.service';
import {FakeserverService} from './fakeserver.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth.guard';
import {AuthService} from './auth.service';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';

// todo: add role guard in canActivate for advanced management of role based access.
const routes: Routes = [
  {path: 'home', component: HomeLandingComponent, canActivate: [AuthGuardService]},
  {path: 'employee/:employeeId', component: EmployeeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLandingComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ChartModule
  ],
  providers: [
    DataService,
    FakeserverService,
    HttpClient,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
