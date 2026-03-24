export const signUpSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["username", "password", "email", "confirmPassword"],
      properties: {
        username: { type: "string", minLength: 4 },
        password: { type: "string", minLength: 5 },
        email: { type: "string", minLength: 5, format: "email" },
        confirmPassword: { type: "string", minLength: 5 },
      },
    },
  },
};
