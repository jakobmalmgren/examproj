import { jwtVerify } from "jose";

export const checkAuth = () => {
  return {
    before: async (request) => {
      const authHeader =
        request.event.headers?.authorization ||
        request.event.headers?.Authorization;

      if (!authHeader) {
        throw new Error("Missing Authorization header");
      }

      if (!authHeader.startsWith("Bearer ")) {
        throw new Error("Invalid Authorization format");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        throw new Error("Missing token");
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      try {
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );

        request.event.user = payload;
      } catch (err) {
        console.error("Auth error:", err);
        throw new Error("Unauthorized");
      }
    },
  };
};
