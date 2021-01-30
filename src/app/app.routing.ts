import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentlistComponent } from './components/departmentlist/departmentlist.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticatedUser } from './gaurds/AuthenticatedUser';
const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/Home/Departments', pathMatch: 'full' },
      { path: 'Departments', component: DepartmentlistComponent },
      { path: 'Employees', component: EmployeeListComponent },
      { path: 'Jobs', component: JoblistComponent }
    ],canActivate:[AuthenticatedUser]
  },
  { path: 'Login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModlue{

}