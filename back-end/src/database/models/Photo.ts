interface Photo {
  id: number;
  id_album: string;
  title: string;
  url: string;
  thumbnail_url: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Photo };
