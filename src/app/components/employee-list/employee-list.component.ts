import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/DialogService';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { VMEmployee } from 'src/app/viewmodels/VMEmployee';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: VMEmployee[] = [];
  from:Date;
  to:Date;
  search:string;
  backAllflag:boolean=false;
  constructor(
    private dialogSRV: DialogService,
    private EmpSRV: EmployeeService,
    private Toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetAll();
  }
  addEmployee() {
    let employee = new VMEmployee();
    employee.ImageThumb = 'assets/user-default.png';
    this.dialogSRV
      .OpenEmployeeDialog(employee)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
           this.getimage(res);
           this.employees.push(res);
        }
      });
  }
  GetAll() {
    this.EmpSRV.GetAll().subscribe(
      (res) => {
        if (res == null || res.length == 0) {
          this.Toaster.info('no employees yet');
        } else {
          res.forEach((element) => {
            this.getimage(element);
          });
          this.employees = res;
        }
      },
      (err) => {
        this.Toaster.error('Error Fetching Employees');
      }
    );
  }
  getimage(emp: VMEmployee) {
    if (emp.ImagePath == null) {
      emp.ImageThumb = 'assets/user-default.png';
    } else {
      emp.ImageThumb = environment.rootImageFile + emp.ImagePath+"?time="+Date.now();
    }
  }
  deleted(id:number){
    let index=this.employees.findIndex(x=>x.Id==id);
    this.employees.splice(index,1);
  }
  backAll(){
    this.GetAll();
    this.search='';
    this.from=undefined;
    this.to=undefined;
  }
  searchtext(event){
     this.backAllflag=true;
     this.EmpSRV.GetBySearch(this.search).subscribe(res=>{
       if(res==null||res.length==0)
       {
         this.Toaster.info("search result empty")
         this.employees=[];
       }
       else{
         res.forEach(element => {
           this.getimage(element);
         });
         this.employees=res;
       }
     },err=>{
       this.Toaster.error("something wrong!")
     });
  }
  searchBetweenDates(){
     if(this.from!=undefined&&this.to!=undefined)
     {
      this.backAllflag=true;
      this.EmpSRV.GetBetweenTwoDates(this.from,this.to).subscribe(res=>{
        if(res==null||res.length==0)
        {
          this.Toaster.info("search result empty")
          this.employees=[];
        }
        else{
          res.forEach(element => {
            this.getimage(element);
          });
          this.employees=res;
        }
      },err=>{
        this.Toaster.error("something wrong!")
      });
     }

  }
}
