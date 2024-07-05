import { Status } from '../../Enums/Status';

export interface IUpdateMerchant {
  id: number;
  storeName?: string;
  userName: string;
  passwordHash: string;
  email: string;
  address: string;
  phoneNumber: string;
  costPerRefusedOrder?: number;
  merchantPayingPercentageForRejectedOrders: number;
  specialPickupShippingCost?: number;
  status: Status;
  cityID: number;
  cityName: string;
  governorateID: number;
  governorateName: string;
}
