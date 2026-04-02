export const postReviewSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["comment", "rating", "name"],
      properties: {
        comment: { type: "string", minLength: 10 },
        rating: { type: "number", minimum: 1, maximum: 5 },
        name: { type: "string", minLength: 1 },
      },
    },
  },
};
