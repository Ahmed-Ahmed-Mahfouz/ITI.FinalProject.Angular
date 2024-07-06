import { Status } from "../../Enums/Status";

export interface IEmployeeInsert{
    id:number;
    fullName:string;
    address:string;
    PhoneNumber:string;
    userName:string;
    email:string;
    passwordHash:string;
    branch:string;
    role:string;
    status:Status
}