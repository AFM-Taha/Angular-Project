export class Core {}

export interface ContactNumber {
  countryCode: string;
  number: number;
}

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export class ApiResponse {
  status: boolean;
  message: string;
  data: any;
  total:Number;
}

export class ApiTableResponse {
  status: boolean;
  message: string;
  data: any;
  total: number;
}

export interface Master {
  id: number;
  value: string;
}

export interface Modules {
  _id: string;
  parentPage: string;
  position: string;
  type: string;
  url: string;
  icon: string;
  code: string;
  name: string;
  subMenu: Modules[];
  functions: Modules[];
}
