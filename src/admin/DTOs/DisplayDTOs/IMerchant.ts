import { ISpecialPackage } from './ISpecialPackage';
import { IDisplayOrder } from './IOrder';
import { Status } from '../../Enums/Status';

export interface IMerchant {
  governorateId?: number;
  cityId?: number;
  id: string;
  storeName?: string;
  userName: string;
  userId: string;
  passwordHash: string;
  email: string;
  address: string;
  phoneNumber: string;
  branchName: string;
  costPerRefusedOrder?: number;
  merchantPayingPercentageForRejectedOrders: number;
  specialPickupShippingCost?: number;
  status: Status;
  specialPackages: ISpecialPackage[];
  orders: IDisplayOrder[];
}
