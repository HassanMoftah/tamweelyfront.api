import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { VMUser } from '../viewmodels/VMUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.backendurl + 'User/';
  constructor(private http: HttpClient, private router: Router) {}
  currentUserToken: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  login(credential: VMUser) {
    let url = this.url + 'Login';
    return this.http
      .post<VMUser>(url, credential)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  isAuthenticated() {
    let token = null;
    this.currentUserToken.subscribe((res) => {
      token = res;
    });
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this.currentUserToken.next(null);
    this.router.navigate(['/Login']);
  }
}
