import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/DialogService';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { VMEmployee } from 'src/app/viewmodels/VMEmployee';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() employee: VMEmployee;
  @Output() deleted:EventEmitter<number>=new EventEmitter<number>();
  constructor(
    private dialogsrv: DialogService,
    private EmpSRV: EmployeeService,
    private Toastr:ToastrService
  ) {}

  ngOnInit(): void {}
  delete() {
    this.dialogsrv
      .OpenConfirmDelete(
        'are you sure deleting employee ' + this.employee.Name + ' ?'
      )
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.EmpSRV.Delete(this.employee.Id).subscribe(
            (res) => {
              this.deleted.emit(this.employee.Id);
            },
            (err) => {
              this.Toastr.error(err.error);
            }
          );
        }
      });
  }
  Edit() {
    let emp=new VMEmployee(this.employee.Id,this.employee.Name,this.employee.Address,
      this.employee.BirthDate,this.employee.Age,this.employee.Email,this.employee.Phone,this.employee.JobId,
      this.employee.DepartmentId,this.employee.ImagePath,null,null,this.employee.ImageThumb);
    this.dialogsrv.OpenEmployeeDialog(emp).afterClosed().subscribe(res=>{
      console.log(res);
         if(res!=false){
           this.getimage(res);
           this.employee=res;
         }
    });
  }
  getimage(emp: VMEmployee) {
    if (emp.ImagePath == null) {
      emp.ImageThumb = 'assets/user-default.png';
    } else {
      emp.ImageThumb = environment.rootImageFile + emp.ImagePath+"?time="+ Date.now();
    }
  }
}
