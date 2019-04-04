/* Defines the order entity */
import { IMember } from "../member";
import { IProduct } from "../product";

export interface IOrder {
  reference: string;
  amount: number;
  quantity: number;
  memberId: number;
  id: number;
  avatar: string;
  membership: boolean;
  orderDate: any;
  shippedDate: any;
  member: IMember;
  products: Array<IProduct>;
  shipAddress: IAddress;
}

export interface IAddress {
  address: string;
  city: string;
  country: string;
  zipcode: string;
}
