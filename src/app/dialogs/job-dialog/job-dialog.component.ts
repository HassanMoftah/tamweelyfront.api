
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/JobService';
import { VMJob } from 'src/app/viewmodels/VMJob';
@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {

  job: VMJob;
  Proccessing = false;
  title: string = 'Add Job';
  IsEditMode = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    private jobSRV: JobService,
    private Toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.job = this.data.Value;
    if (this.job.Id > 0) {
      this.title = 'Update Job';
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
    this.jobSRV.Add(this.job).subscribe(
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
    this.jobSRV.Update(this.job).subscribe(
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
