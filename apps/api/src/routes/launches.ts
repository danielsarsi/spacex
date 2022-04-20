import axios from "axios";
import { FastifyPluginAsync } from "fastify";
import {
  LaunchSchema,
  LaunchParamsSchema,
  LaunchParams,
  Launch,
} from "schemas";

const launches: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  /** /launches */
  fastify.get<{ Reply: Launch[] }>(
    "/launches",
    {
      schema: {
        description: "Lista todos os lançamentos",
        tags: ["launches"],
        response: {
          200: {
            type: "array",
            items: LaunchSchema,
          },
        },
      },
    },
    async function (request, reply) {
      const [error, launches] = await fastify.to(
        fastify.axios("https://api.spacexdata.com/v5/launches/")
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }

      const response = launches.data.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        date: launch.date_unix,
      }));

      return response;
    }
  );

  /** /launches/next */
  fastify.get<{ Reply: Launch }>(
    "/launches/next",
    {
      schema: {
        description: "Retorna o próximo lançamento",
        tags: ["launches"],
        response: {
          200: LaunchSchema,
        },
      },
    },
    async function (request, reply) {
      const [error, launch] = await fastify.to(
        fastify.axios("https://api.spacexdata.com/v5/launches/next")
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }

      const response = {
        id: launch.data.id,
        name: launch.data.name,
        date: launch.data.date_unix,
      };

      return response;
    }
  );

  /** /launches/upcoming */
  fastify.get<{ Reply: Launch }>(
    "/launches/upcoming",
    {
      schema: {
        description: "Retorna os próximos lançamentos",
        tags: ["launches"],
        response: {
          200: {
            type: "array",
            items: LaunchSchema,
          },
        },
      },
    },
    async function (request, reply) {
      const [error, launches] = await fastify.to(
        fastify.axios("https://api.spacexdata.com/v5/launches/upcoming")
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }
      const response = launches.data.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        date: launch.date_unix,
      }));

      return response;
    }
  );

  /** /launches/past */
  fastify.get<{ Reply: Launch }>(
    "/launches/past",
    {
      schema: {
        description: "Retorna os lançamentos passados",
        tags: ["launches"],
        response: {
          200: {
            type: "array",
            items: LaunchSchema,
          },
        },
      },
    },
    async function (request, reply) {
      const [error, launches] = await fastify.to(
        fastify.axios("https://api.spacexdata.com/v5/launches/past")
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }

      const response = launches.data.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        date: launch.date_unix,
      }));

      return response;
    }
  );

  /** /launches/latest */
  fastify.get<{ Reply: Launch }>(
    "/launches/latest",
    {
      schema: {
        description: "Retorna o último lançamento",
        tags: ["launches"],
        response: {
          200: LaunchSchema,
        },
      },
    },
    async function (request, reply) {
      const [error, launch] = await fastify.to(
        fastify.axios("https://api.spacexdata.com/v5/launches/latest")
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }

      const response = {
        id: launch.data.id,
        name: launch.data.name,
        date: launch.data.date_unix,
      };

      return response;
    }
  );

  /** /launches/:id */
  fastify.get<{ Params: LaunchParams; Reply: Launch }>(
    "/launches/:id",
    {
      schema: {
        description: "Retorna um lançamento",
        tags: ["launches"],
        params: LaunchParamsSchema,
        response: {
          200: LaunchSchema,
        },
      },
    },
    async function (request, reply) {
      const [error, launch] = await fastify.to(
        fastify.axios(
          `https://api.spacexdata.com/v5/launches/${request.params.id}`
        )
      );

      if (axios.isAxiosError(error)) {
        throw fastify.httpErrors.createError(
          error.response?.status ?? 500,
          error.message
        );
      }

      const response = {
        id: launch.data.id,
        name: launch.data.name,
        date: launch.data.date_unix,
      };

      return response;
    }
  );
};

export default launches;
