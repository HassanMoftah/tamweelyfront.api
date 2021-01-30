import { VMJob } from "./VMJob";
import { VMDepartment } from "./VMDepartment";

export class VMEmployee{
    constructor(
        public Id?:number,
        public Name?:string,
        public Address?:string,
        public BirthDate?:Date,
        public Age?:number,
        public Email?:string,
        public Phone?:string,
        public JobId?:number,
        public DepartmentId?:number,
        public ImagePath?:string,
        public Job?:VMJob,
        public Department?:VMDepartment,
        public ImageThumb?:string

    ){}
}