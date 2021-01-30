import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { VMJob } from '../viewmodels/VMJob';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  url = environment.backendurl + 'Job/';
  constructor(private http: HttpClient) {}

  Add(job: VMJob) {
    let url = this.url + 'Add';
    return this.http.post<VMJob>(url, job).pipe(catchError(this.errorHandler));
  }
  Update(job: VMJob) {
    let url = this.url + 'Update';
    return this.http.post<VMJob>(url, job).pipe(catchError(this.errorHandler));
  }
  Delete(id: number) {
    let url = this.url + 'Delete?id=' + id;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }
  GetAll() {
    let url = this.url + 'GetAll';
    return this.http.get<VMJob[]>(url).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
