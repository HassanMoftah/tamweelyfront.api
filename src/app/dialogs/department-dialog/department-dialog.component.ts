import { VMDepartment } from 'src/app/viewmodels/VMDepartment';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/DepartmentService';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css'],
})
export class DepartmentDialogComponent implements OnInit {
  department: VMDepartment;
  Proccessing = false;
  title: string = 'Add Department';
  IsEditMode = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private depSRV: DepartmentService,
    private Toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.department = this.data.Value;
    if (this.department.Id > 0) {
      this.title = 'Update Department';
      this.IsEditMode = true;
    }
  }
  cancel() {
    this.dialogRef.close(false);
  }
  save() {
    this.Proccessing = true;
    if (this.IsEditMode) {
      this.edit();
    } else {
      
      this.add();
    }
  }
  add() {
    this.depSRV.Add(this.department).subscribe(
      (res) => {
        this.dialogRef.close(res);
      },
      (err) => {
        console.log(err);
        this.Toaster.error(err.error);
        this.Proccessing = false;
      }
    );
  }
  edit() {
    this.depSRV.Update(this.department).subscribe(
      (res) => {
        this.dialogRef.close(res);
      },
      (err) => {
        this.Toaster.error(err.error);
        this.Proccessing = false;
      }
    );
  }
}
