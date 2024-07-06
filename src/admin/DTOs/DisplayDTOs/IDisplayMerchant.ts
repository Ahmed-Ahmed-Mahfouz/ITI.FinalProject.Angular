import { IDisplaySpecialPackage } from './IDisplaySpecialPackage';
import { IDisplayOrder } from './IDisplayOrder';
import { Status } from '../../Enums/Status';

export interface IDisplayMerchant {
  id: string;
  storeName?: string;
  userName: string;
  userId: string;
  email: string;
  address: string;
  phoneNumber: string;
  costPerRefusedOrder?: number;
  branchName: string;
  cityName: string;
  governorateName: string;
  status: Status;
  merchantPayingPercentageForRejectedOrders: number;
  specialPickupShippingCost?: number;
  specialPackages: IDisplaySpecialPackage[];
  orders: IDisplayOrder[];
}
