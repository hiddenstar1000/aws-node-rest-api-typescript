import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "aws-node-rest-api-typescript",

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    environment: {
      NODE_ENV: "dev",
    },
    region: "us-east-1",
  },

  plugins: ["serverless-plugin-typescript", "serverless-offline"],

  package: {
    exclude: ["config/.env.stg", "config/.env.pro"],
    include: ["config/.env.dev"],
  },

  functions: {
    create: {
      handler: "app/handler.create",
      events: [
        {
          http: {
            path: "books",
            method: "post",
            request: {
              schemas: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      id: { type: "number" },
                    },
                    required: ["name", "id"],
                  },
                },
              },
            },
          },
        },
      ],
    },
    update: {
      handler: "app/handler.update",
      events: [
        {
          http: {
            path: "books/{id}",
            method: "put",
            request: {
              parameters: {
                paths: {
                  id: { required: true },
                },
              },
              schemas: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    find: {
      handler: "app/handler.find",
      events: [
        {
          http: {
            path: "books",
            method: "get",
          },
        },
      ],
    },
    findOne: {
      handler: "app/handler.findOne",
      events: [
        {
          http: {
            path: "books/{id}",
            method: "get",
            request: {
              parameters: {
                paths: {
                  id: { required: true },
                },
              },
            },
          },
        },
      ],
    },
    deleteOne: {
      handler: "app/handler.deleteOne",
      events: [
        {
          http: {
            path: "books/{id}",
            method: "delete",
            request: {
              parameters: {
                paths: {
                  id: { required: true },
                },
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
