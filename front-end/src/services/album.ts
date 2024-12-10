import { get } from "./api";
import RequestError from "./errors/RequestError";

type PayloadAlbumId = {
  id: string;
};

async function getAllAlbums() {
  const result: any = await get("/api/albums");

  if (
    result?.status === 400 ||
    result?.status === 401 ||
    result?.status === 500
  ) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

async function getAlbumFromUserId(payload: PayloadAlbumId) {
  const result: any = await get(`/api/albums/${payload.id}`);

  if (
    result?.status === 400 ||
    result?.status === 401 ||
    result?.status === 500
  ) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

export { getAllAlbums, getAlbumFromUserId };
