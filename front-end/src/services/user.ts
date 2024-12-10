import { get } from "./api";
import RequestError from "./errors/RequestError";

async function getAllUsers() {
  const result: UserAPIResponse[] = await get("/api/user");

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

export { getAllUsers };
