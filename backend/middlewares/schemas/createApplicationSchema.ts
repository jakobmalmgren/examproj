export const createApplicationSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: [
        "title",
        "category",
        "priority",
        "location",
        "files",
        "extraInfo",
        "applicationDate",
      ],
      additionalProperties: false,
      properties: {
        title: {
          type: "string",
          minLength: 2,
        },
        extraInfo: {
          type: "array",
          items: {
            type: "string",
          },
        },
        category: {
          type: "string",
          minLength: 1,
        },
        priority: {
          type: "integer",
          enum: [1, 2, 3],
        },
        reminder: {
          type: "boolean",
        },
        reminderDate: {
          anyOf: [{ type: "string", minLength: 1 }, { type: "null" }],
        },
        applicationDate: {
          type: "string",
          minLength: 1,
        },
        files: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "url", "key", "contentType"],
            additionalProperties: false,
            properties: {
              name: { type: "string", minLength: 1 },
              url: { type: "string", minLength: 1 },
              key: { type: "string", minLength: 1 },
              contentType: { type: "string", minLength: 1 },
            },
          },
        },
        location: {
          type: "object",
          required: ["city", "latitude", "longitude"],
          additionalProperties: false,
          properties: {
            city: { type: "string" },
            latitude: {
              anyOf: [{ type: "number" }, { type: "null" }],
            },
            longitude: {
              anyOf: [{ type: "number" }, { type: "null" }],
            },
          },
        },
      },
      allOf: [
        {
          if: {
            properties: {
              reminder: { const: true },
            },
          },
          then: {
            required: ["reminderDate"],
            properties: {
              reminderDate: {
                type: "string",
                minLength: 1,
              },
            },
          },
        },
      ],
    },
  },
};
