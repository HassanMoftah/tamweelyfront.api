import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { VMDepartment } from '../viewmodels/VMDepartment';
import { VMEmployee } from '../viewmodels/VMEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = environment.backendurl + 'Employee/';
  constructor(private http: HttpClient) {}

  Add(emp: VMEmployee) {
    let url = this.url + 'Add';
    return this.http
      .post<VMEmployee>(url, emp)
      .pipe(catchError(this.errorHandler));
  }
  Update(emp: VMEmployee) {
    let url = this.url + 'Update';
    return this.http
      .post<VMEmployee>(url, emp)
      .pipe(catchError(this.errorHandler));
  }
  Delete(id: number) {
    let url = this.url + 'Delete?id=' + id;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }
  GetAll() {
    let url = this.url + 'GetAll';
    return this.http.get<VMEmployee[]>(url).pipe(catchError(this.errorHandler));
  }
  UploadImage(id:number,data:any){
    let url = this.url + 'UploadImage?id='+id;
    return this.http
    .post(url, data)
    .pipe(catchError(this.errorHandler));
  }
  Get(id: number) {
    let url = this.url + 'Get?id=' + id;
    return this.http.get<VMEmployee>(url).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  GetBySearch(text:string){
    let url = this.url + 'GetBySearch?text=' + text;
    return this.http.get<VMEmployee[]>(url).pipe(catchError(this.errorHandler));
  }
  GetBetweenTwoDates(from,to){
    let url = this.url + 'GetBetweenTwoDates?from=' + from+"&to="+to;
    return this.http.get<VMEmployee[]>(url).pipe(catchError(this.errorHandler));
  }
}
