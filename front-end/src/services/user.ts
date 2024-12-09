import { get } from "./api";
import RequestError from "./errors/RequestError";

async function getAllUsers() {
  const result: any = await get("/api/user");

  if (
    result?.status === 400 ||
    result?.status === 401 ||
    result?.status === 500
  ) {
    throw new RequestError(result.message, result.status);
  }

  return result;
}

export { getAllUsers };
