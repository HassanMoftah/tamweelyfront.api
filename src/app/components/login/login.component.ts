import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/UserService';
import { VMUser } from 'src/app/viewmodels/VMUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  IsLoading: boolean = false;
  User: VMUser = new VMUser();
  constructor(private UserSRV: UserService, private Toaster: ToastrService,private router:Router) {}

  ngOnInit(): void {}
  onSubmit() {
    this.IsLoading=true;
    this.UserSRV.login(this.User).subscribe(res=>{
      
      this.UserSRV.currentUserToken.next(res.Token);
      this.router.navigate(['/Home/Employees']);
    },err=>{
      this.IsLoading=false;
       this.Toaster.error(err.error);
    });
  }
}
