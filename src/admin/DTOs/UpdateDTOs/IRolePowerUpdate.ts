import { PowerTypes } from "../../Enums/PowerTypes";

export interface IRolePowerUpdate {
    roleId:string,
    roleName:string,
    powers: PowerTypes[]
}