/* Defines the customer entity */
export interface IRevenue {
  id: string;
  type: string;
  isGuest: string;
  memberId: string;
  guestName: string;
  amount: string;
  paidDate: string;
  fromDate: string;
  toDate: string;
}

