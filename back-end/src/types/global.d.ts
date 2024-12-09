declare interface Coords {
  lat: string;
  lng: string;
}
declare interface UserAddress {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Coords;
}

declare interface Company {
  id: number;
  name: string;
  catchPhrase: string;
  bs: string;
}

declare interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  addres: UserAddress;
  phone: string;
  website: string;
  company: Company;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
