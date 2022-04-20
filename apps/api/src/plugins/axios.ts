import fp from "fastify-plugin";
import axios, { AxiosInstance } from "axios";

export default fp(async (fastify, opts) => {
  const instance = axios.create();
  fastify.decorate("axios", instance);
});

declare module "fastify" {
  export interface FastifyInstance {
    axios: AxiosInstance;
  }
}
