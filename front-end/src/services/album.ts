import { del, get, post } from "./api";
import RequestError from "./errors/RequestError";

type PayloadAlbumId = {
  id: string;
};

type CreateAlbumPayload = {
  title: string;
  idUser: string;
};

async function getAllAlbums() {
  const result: UserAlbumAPIResponse[] = await get("/api/albums");

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

async function getAlbumFromUserId(payload: PayloadAlbumId) {
  const result: UserAlbumAPIResponse = await get(`/api/albums/${payload.id}`);

  if (!result) {
    return [{}];
  }

  if (result.status === 400 || result.status === 401 || result.status === 500) {
    throw new RequestError(
      result.errorMessage ? result.errorMessage : "Erro desconhecido",
      result.status
    );
  }

  return result;
}

async function deleteAlbum(payload: PayloadAlbumId) {
  const result: DeleteAPIResponse = await del(`/api/albums`, payload);

  if (!result) {
    return [];
  }

  if (result.status === 400 || result.status === 401 || result.status === 500) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

async function createAlbum(payload: CreateAlbumPayload) {
  const result: any = await post("/api/albums", payload);

  if (!result) {
    return [];
  }

  if (result.status === 400 || result.status === 401 || result.status === 500) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

export { getAllAlbums, getAlbumFromUserId, deleteAlbum, createAlbum };
