interface Album {
  id: number;
  id_user: number;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Album };
