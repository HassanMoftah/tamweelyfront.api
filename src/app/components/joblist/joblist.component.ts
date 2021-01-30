import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/DialogService';
import { JobService } from 'src/app/services/JobService';
import { VMJob } from 'src/app/viewmodels/VMJob';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  jobs: VMJob[] = [];
  constructor(
    private toaster: ToastrService,
    private jobSRV: JobService,
    private dialogSRV: DialogService
  ) {}

  ngOnInit(): void {
    this.GetAll();
  }
  addJob() {
    let job = new VMJob();
    this.dialogSRV
      .OpenJobDialog(job)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
          this.jobs.push(res);
        }
      });
  }
  delete(job: VMJob) {
    this.dialogSRV
      .OpenConfirmDelete('are you sure deleting job ' + job.Name + ' ?')
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.jobSRV.Delete(job.Id).subscribe(
            (resd) => {
              let index = this.jobs.indexOf(job);
              this.jobs.splice(index, 1);
            },
            (err) => {
              this.toaster.error(err.error);
            }
          );
        }
      });
  }
  edit(job: VMJob) {
    let jobx = new VMJob(job.Id,job.Name);
    this.dialogSRV
      .OpenJobDialog(jobx)
      .afterClosed()
      .subscribe((res) => {
        if (res != false) {
           let idnex=this.jobs.indexOf(job);
           this.jobs[idnex]=res;
        }
      });
  }
  GetAll() {
    this.jobSRV.GetAll().subscribe(
      (res) => {
        if (res == null || res.length == 0) {
          this.toaster.info('no jobs yet');
        } else {
          this.jobs = res;
        }
      },
      (err) => {
        this.toaster.error(err.error);
      }
    );
  }

}
