import { Status } from '../../Enums/Status';

export interface IAddMerchant {
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
  governorateID: number;
}
