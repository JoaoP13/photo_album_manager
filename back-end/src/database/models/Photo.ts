interface Photo {
  id: number;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Photo };
