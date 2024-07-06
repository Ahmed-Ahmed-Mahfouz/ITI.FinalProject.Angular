import { Status } from "../../Enums/Status";

export interface IEmployeeUpdate{
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