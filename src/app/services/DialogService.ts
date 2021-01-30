import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { DepartmentDialogComponent } from '../dialogs/department-dialog/department-dialog.component';
import { EmployeeDialogComponent } from '../dialogs/employee-dialog/employee-dialog.component';
import { JobDialogComponent } from '../dialogs/job-dialog/job-dialog.component';
import { VMDepartment } from '../viewmodels/VMDepartment';
import { VMEmployee } from '../viewmodels/VMEmployee';
import { VMJob } from '../viewmodels/VMJob';
@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  OpenDepartmentDialog(data: VMDepartment) {
    return this.dialog.open(DepartmentDialogComponent, {
      width: '35%',
      height: 'max-height',
      panelClass:'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  OpenJobDialog(data: VMJob) {
    return this.dialog.open(JobDialogComponent, {
      width: '35%',
      height: 'max-height',
      panelClass:'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  OpenEmployeeDialog(data: VMEmployee) {
    return this.dialog.open(EmployeeDialogComponent, {
      width: '55%',
      height: 'max-height',
      panelClass:'custome-mat-card',
      disableClose: true,
      data: {
        Value: data,
      },
    });
  }
  OpenConfirmDelete(data:string)
  {
    return this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '35%',
        height: 'max-height',
        panelClass:'custome-mat-card',
        disableClose: true,
        data: {
            message: data,
        },
      });
  }
}
