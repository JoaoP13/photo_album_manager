interface Address {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Address };
