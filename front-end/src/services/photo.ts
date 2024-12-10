import { get, del, post } from "./api";
import RequestError from "./errors/RequestError";

type PayloadPhotoId = {
  idAlbum: string;
};

type PayloadDeletePhoto = {
  idAlbum: string | undefined;
  url: string | undefined;
};

type CreatePhotoPayload = {
  title: string;
  url: string;
  thumbnailUrl: string;
  idAlbum: string | undefined;
};

async function getPhotosFromAlbumId(payload: PayloadPhotoId) {
  const result: PhotoAPIResponse[] = await get(`/api/photo/${payload.idAlbum}`);

  if (!result) {
    return [];
  }

  if (
    result[0].status === 400 ||
    result[0].status === 401 ||
    result[0].status === 500
  ) {
    throw new RequestError(
      result[0].errorMessage ? result[0].errorMessage : "Erro desconhecido",
      result[0].status
    );
  }

  return result;
}

async function deleteAPhotoFromAlbum(payload: PayloadDeletePhoto) {
  const result: DeleteAPIResponse = await del(`/api/photo`, payload);

  if (!result) {
    return [];
  }

  if (result.status === 400 || result.status === 401 || result.status === 500) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

async function createPhoto(payload: CreatePhotoPayload) {
  const result: any = await post("/api/photo", payload);

  if (!result) {
    return [];
  }

  if (result.status === 400 || result.status === 401 || result.status === 500) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

export { getPhotosFromAlbumId, deleteAPhotoFromAlbum, createPhoto };
