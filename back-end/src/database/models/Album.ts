interface Album {
  id: number;
  userId: number;
  title: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Album };
