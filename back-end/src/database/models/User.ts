interface User {
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

export { User };
