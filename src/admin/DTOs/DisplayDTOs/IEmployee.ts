import { Status } from "../../Enums/Status";

export interface IEmployee{
    
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