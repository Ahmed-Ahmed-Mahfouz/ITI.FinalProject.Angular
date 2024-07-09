import { IPowers } from './IPowers';

export interface IRolePower {
  roleId: string;
  roleName: string;
  timeOfAddtion: Date;
  powers:IPowers[] | undefined
}
