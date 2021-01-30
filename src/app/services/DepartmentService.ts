import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { VMDepartment } from '../viewmodels/VMDepartment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  url = environment.backendurl + 'Department/';
  constructor(private http: HttpClient) {}

  Add(dep: VMDepartment) {
    let url = this.url + 'Add';
    return this.http
      .post<VMDepartment>(url, dep)
      .pipe(catchError(this.errorHandler));
  }
  Update(dep: VMDepartment) {
    let url = this.url + 'Update';
    return this.http
      .post<VMDepartment>(url, dep)
      .pipe(catchError(this.errorHandler));
  }
  Delete(id: number) {
    let url = this.url + 'Delete?id=' + id;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }
  GetAll() {
    let url = this.url + 'GetAll';
    return this.http
      .get<VMDepartment[]>(url)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
