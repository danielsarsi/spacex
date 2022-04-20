import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Verificação de saúde da API",
        response: {
          200: {
            type: "string",
            example: "OK",
          },
        },
      },
    },
    async function (request, reply) {
      return "OK";
    }
  );
};

export default root;
