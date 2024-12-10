import axios from "axios";
import RequestError from "./errors/RequestError.ts";

type AxiosResponse = {
  error: string;
  message: string;
  status: number;
};

const loggout = () => {
  window.localStorage.clear();
  window.location.replace("/");
};

const host = "http://localhost:3008";

async function get(url: string, params: any = {}) {
  try {
    const result = await axios.get(host + url, {
      params,
    });

    const data = await result.data;

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data) {
        if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message === "Sessão expirada"
        ) {
          setTimeout(() => loggout(), 2000);
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            401
          );
        } else if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message ===
            "Você não tem permissão para acessar este recurso!"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            403
          );
        }

        return {
          message: (error.response.data as AxiosResponse).message,
          status: error.response.status,
        };
      } else {
        return {
          message: error.message,
          status: 500,
        };
      }
    }
  }
}

async function post(url: string, params: any = {}) {
  try {
    const result = await axios.post(host + url, { params });

    const data = await result.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data) {
        if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message === "Sessão expirada"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            401
          );
        } else if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message ===
            "Você não tem permissão para acessar este recurso!"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            403
          );
        }

        return {
          message: (error.response.data as AxiosResponse).message,
          status: error.response.status,
        };
      } else {
        return {
          message: error.message,
          status: 500,
        };
      }
    }
  }
}

async function patch(url: string, params: any = {}) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const result = await axios.patch(
      host + url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await result.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data) {
        if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message === "Sessão expirada"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            401
          );
        } else if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message ===
            "Você não tem permissão para acessar este recurso!"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            403
          );
        }

        return {
          message: (error.response.data as AxiosResponse).message,
          status: error.response.status,
        };
      } else {
        return {
          message: error.message,
          status: 500,
        };
      }
    }
  }
}

async function del(url: string, params: any = {}) {
  try {
    const result = await axios.delete(host + url, {
      params,
    });

    const data = await result.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data) {
        if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message === "Sessão expirada"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            401
          );
        } else if (
          (error.response.data as AxiosResponse).message &&
          (error.response.data as AxiosResponse).message ===
            "Você não tem permissão para acessar este recurso!"
        ) {
          throw new RequestError(
            (error.response.data as AxiosResponse).message,
            403
          );
        }
        return {
          message: (error.response.data as AxiosResponse).message,
          status: error.response.status,
        };
      } else {
        return {
          message: error.message,
          status: 500,
        };
      }
    }
  }
}

export { get, post, patch, del };
