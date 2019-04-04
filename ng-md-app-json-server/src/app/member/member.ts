/* Defines the customer entity */
export interface IMember {
  id: string;
  name: string;
  mobileNumber: string;
  gender: string;
  area: string;
  address: string;
  age: string;
  married: string;
  occupation: string;
  income: string;
  familyMemDetails: IFamilyMember[];
}

export interface IFamilyMember {
  famName: string;
  relation: string;
  famAge: string;
  famMarried: string;
  famEmployed: string;
  famEducation: string;
}
