import { jwtVerify } from "jose";

export const checkAuth = () => {
  return {
    before: async (request) => {
      try {
        const authHeader =
          request.event.headers.authorization ||
          request.event.headers.Authorization;

        if (!authHeader) {
          throw new Error("No token provided");
        }

        const token = authHeader.split(" ")[1];

        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );

        request.event.user = payload;
      } catch (err) {
        console.error("Auth error:", err);

        // 🔥 kasta error → fångas i onError
        throw new Error("Unauthorized");
      }
    },
  };
};
