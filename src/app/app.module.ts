import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDialogComponent } from './dialogs/employee-dialog/employee-dialog.component';
import { JobDialogComponent } from './dialogs/job-dialog/job-dialog.component';
import { DepartmentDialogComponent } from './dialogs/department-dialog/department-dialog.component';
import { ConfirmDeleteDialogComponent } from './dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AppRoutingModlue } from './app.routing';
import { Interceptor } from './services/Intercepotr';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    DepartmentlistComponent,
    JoblistComponent,
    EmployeeComponent,
    EmployeeDialogComponent,
    JobDialogComponent,
    DepartmentDialogComponent,
    EmployeeListComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      maxOpened: 10,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),AppRoutingModlue
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:Interceptor,
    multi:true
}],
  bootstrap: [AppComponent],
})
export class AppModule {}
