declare interface UserAlbum {
  id: number;
  id_user: number;
  id_address: number;
  id_company: number;
  name: string;
  phone: string;
  website: string;
  email: string;
  title: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

declare interface DeleteAPIResponse {
  message: string;
  status: numiber;
}

declare interface UserAlbumAPIResponse {
  status: number;
  errorMessage?: string;
  id?: number;
  id_user?: number;
  id_address?: number;
  id_company?: number;
  name?: string;
  phone?: string;
  website?: string;
  email?: string;
  title?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

declare interface UserAPIResponse {
  status: number;
  errorMessage?: string;
  id?: number;
  name?: string;
  userName?: string;
  email?: string;
  address?: UserAddress;
  phone?: string;
  website?: string;
  company?: Company;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

declare interface PhotoAPIResponse {
  status: number;
  errorMessage?: string;
  id?: number;
  id_album?: string;
  title?: string;
  url?: string;
  thumbnail_url?: UserAddress;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

declare interface FetchDataError {
  errorMessage: string;
  status: number;
}
