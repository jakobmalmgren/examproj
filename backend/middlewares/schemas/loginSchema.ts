export const loginSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 4 },
        password: { type: "string", minLength: 5 },
      },
    },
  },
};
