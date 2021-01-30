import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/DepartmentService';
import { DialogService } from 'src/app/services/DialogService';
import { VMDepartment } from 'src/app/viewmodels/VMDepartment';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css'],
})
export class DepartmentlistComponent implements OnInit {
  departments: VMDepartment[] = [];
  constructor(
    private toaster: ToastrService,
    private depSRV: DepartmentService,
    private dialogSRV: DialogService
  ) {}

  ngOnInit(): void {
    this.GetAll();
  }
  addDeparment() {
    let dep = new VMDepartment();
    this.dialogSRV
      .OpenDepartmentDialog(dep)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
          this.departments.push(res);
        }
      });
  }
  delete(dep: VMDepartment) {
    this.dialogSRV
      .OpenConfirmDelete('are you sure deleting department ' + dep.Name + ' ?')
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.depSRV.Delete(dep.Id).subscribe(
            (resd) => {
              let index = this.departments.indexOf(dep);
              this.departments.splice(index, 1);
            },
            (err) => {
              this.toaster.error(err.error);
            }
          );
        }
      });
  }
  edit(dep: VMDepartment) {
    let depx = new VMDepartment(dep.Id,dep.Name);
    this.dialogSRV
      .OpenDepartmentDialog(depx)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
           let idnex=this.departments.indexOf(dep);
           this.departments[idnex]=res;
        }
      });
  }
  GetAll() {
    this.depSRV.GetAll().subscribe(
      (res) => {
        if (res == null || res.length == 0) {
          this.toaster.info('no departments yet');
        } else {
          this.departments = res;
        }
      },
      (err) => {
        this.toaster.error(err.error);
      }
    );
  }
}
