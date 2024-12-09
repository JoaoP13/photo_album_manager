interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: Company;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { User };
