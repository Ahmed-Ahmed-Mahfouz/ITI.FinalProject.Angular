import { Status } from '../../Enums/Status';
import { IUpdateSpecialPackage } from './IUpdateSpecialPackage';

export interface IUpdateMerchant {
  id: string;
  storeName?: string;
  userName: string;
  passwordHash: string;
  email: string;
  address: string;
  phoneNumber: string;
  merchantPayingPercentageForRejectedOrders: number;
  specialPickupShippingCost?: number;
  status: Status;
  cityID: number;
  branchId: number;
  cityName: string;
  governorateID: number;
  specialPackages: IUpdateSpecialPackage[];
}
