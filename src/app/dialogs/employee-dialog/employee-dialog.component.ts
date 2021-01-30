import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentService } from 'src/app/services/DepartmentService';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { JobService } from 'src/app/services/JobService';
import { VMDepartment } from 'src/app/viewmodels/VMDepartment';
import { VMEmployee } from 'src/app/viewmodels/VMEmployee';
import { VMJob } from 'src/app/viewmodels/VMJob';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
})
export class EmployeeDialogComponent implements OnInit {
  Processing = false;
  Title = 'Add Employee';
  Image: any = null;
  employee: VMEmployee;
  deps: VMDepartment[] = [];
  jobs: VMJob[] = [];
  IsEditMode = false;
  constructor(
    private depSRV: DepartmentService,
    private jobsSRV: JobService,
    private empSRV: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private Toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetDepartments();
    this.GetJobs();
    this.employee = this.data.Value;
    if (this.employee.Id > 0) {
      this.Title = 'Update Employee';
      this.IsEditMode = true;
    }
  }
  OnChange(files: FileList) {
    this.Image = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.employee.ImageThumb = event.target.result;
    };
    reader.readAsDataURL(this.Image);
  }
  GetDepartments() {
    this.depSRV.GetAll().subscribe((res) => {
      if (res != null) {
        this.deps = res;
      }
    });
  }
  GetJobs() {
    this.jobsSRV.GetAll().subscribe((res) => {
      if (res != null) {
        this.jobs = res;
      }
    });
  }
  save() {
    this.Processing=true;
    let newimage = new FormData();
    newimage.append('Image', this.Image);
    if (this.IsEditMode) {
      this.Edit(newimage);
    } else {
      this.Add(newimage);
    }
  }
  close() {
    this.dialogRef.close(false);
  }
  AddImage(data: any, id: number) {
    this.empSRV.UploadImage(id, data).subscribe(
      (res) => {
        this.Get(id);
      },
      (err) => {
        this.Toaster.error("add image failed");
        this.dialogRef.close(false);
      }
    );
  }
  Add(data: any) {
    this.empSRV.Add(this.employee).subscribe(
      (res) => {
        if (this.Image != null) {
          this.AddImage(data, res.Id);
        } else {
          this.Get(res.Id);
        }
      },
      (err) => {
        console.log(err);
        this.Toaster.error("Bad Request");
        this.dialogRef.close(false);
      }
    );
  }
  Edit(data: any) {
    this.empSRV.Update(this.employee).subscribe(
      (res) => {
        if (this.Image != null) {
          this.AddImage(data, res.Id);
        } else {
          this.Get(res.Id);
        }
      },
      (err) => {
        this.Toaster.error("Bad Request");
        this.dialogRef.close(false);
      }
    );
  }
  Get(id:number){
    this.empSRV.Get(id).subscribe(res=>{
      this.dialogRef.close(res);
    },err=>{
      this.Toaster.error("fetch employee failed");
      this.dialogRef.close(false);
    });
  }
}
