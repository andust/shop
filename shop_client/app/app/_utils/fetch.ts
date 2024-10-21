import { headerCookies } from "./cookie";

export const verifyToken = async (access: string) => {
  return fetch(`${process.env.USER_SERIVCE}/api/v1/token/verify`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Cookie: `access=${access}`,
    },
  });
};

export const refreshToken = async (access: string) => {
  return fetch(`${process.env.USER_SERIVCE}/api/v1/token/refresh`, {
    cache: "no-cache",
    headers: {
      Cookie: `access=${access}`,
    },
    method: "get",
  });
};

export const getUser = async (access: string) => {
  return fetch(`${process.env.USER_SERIVCE}/api/v1/user`, {
    cache: "no-cache",
    headers: {
      Cookie: `access=${access}`,
    },
    credentials: "include",
    method: "get",
  });
};

export const getValidToken = async (
  access: string,
): Promise<{ validAccess: string; isFresh: boolean }> => {
  try {
    const tokenVerifyResponse = await verifyToken(access);
    if (tokenVerifyResponse.ok) {
      return { validAccess: access, isFresh: false };
    }

    const refreshResponse = await refreshToken(access);
    
    if (refreshResponse.ok) {
      return {
        validAccess: headerCookies(refreshResponse.headers).access,
        isFresh: true,
      };
    }
  } catch (error) {
    throw error;
  }
  throw new Error("fresh token problem");
};
