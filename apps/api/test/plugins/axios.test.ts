import { test } from "tap";
import Fastify from "fastify";
import axios from "../../src/plugins/axios";

test("axios works standalone", async (t) => {
  const fastify = Fastify();
  void fastify.register(axios);
  await fastify.ready();

  t.ok(fastify.axios);
  t.end();
});
