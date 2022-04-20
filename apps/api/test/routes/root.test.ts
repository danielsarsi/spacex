import { test } from "tap";
import { build } from "../helper";

test("should return OK for health check", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
  });

  t.equal(res.statusCode, 200);
  t.equal(res.payload, "OK");

  t.end();
});
