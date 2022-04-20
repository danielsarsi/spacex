import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "fastify-swagger";

export default fp<SwaggerOptions>(async (fastify, opts) => {
  void fastify.register(swagger, {
    openapi: {
      info: {
        title: "SpaceX API",
        version: "1.0.0",
      },
    },
    exposeRoute: true,
  });
});
