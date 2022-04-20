import MockAdapter from "axios-mock-adapter";
import { build } from "../helper";
import { test } from "tap";
import fixture from "../fixtures/launches.json";

test("should return a list of launches", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);
  mock
    .onGet("https://api.spacexdata.com/v5/launches/")
    .reply(200, [fixture[0], fixture[1], fixture[2]]);

  const res = await app.inject({
    url: "/launches",
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), [
    {
      id: fixture[0].id,
      name: fixture[0].name,
      date: fixture[0].date_unix,
    },
    {
      id: fixture[1].id,
      name: fixture[1].name,
      date: fixture[1].date_unix,
    },
    {
      id: fixture[2].id,
      name: fixture[2].name,
      date: fixture[2].date_unix,
    },
  ]);

  t.end();
});

test("should return specific launch", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);

  mock
    .onGet(`https://api.spacexdata.com/v5/launches/${fixture[0].id}`)
    .reply(200, fixture[0]);

  const res = await app.inject({
    url: `/launches/${fixture[0].id}`,
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), {
    id: fixture[0].id,
    name: fixture[0].name,
    date: fixture[0].date_unix,
  });

  t.end();
});

test("should return next launch", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);
  mock
    .onGet("https://api.spacexdata.com/v5/launches/next")
    .reply(200, fixture[0]);

  const res = await app.inject({
    url: "/launches/next",
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), {
    id: fixture[0].id,
    name: fixture[0].name,
    date: fixture[0].date_unix,
  });

  t.end();
});

test("should return latest launch", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);
  mock
    .onGet("https://api.spacexdata.com/v5/launches/latest")
    .reply(200, fixture[0]);

  const res = await app.inject({
    url: `/launches/latest`,
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), {
    id: fixture[0].id,
    name: fixture[0].name,
    date: fixture[0].date_unix,
  });

  t.end();
});

test("should return upcoming launches", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);
  mock
    .onGet("https://api.spacexdata.com/v5/launches/upcoming")
    .reply(200, [fixture[0], fixture[1], fixture[2]]);

  const res = await app.inject({
    url: "/launches/upcoming",
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), [
    {
      id: fixture[0].id,
      name: fixture[0].name,
      date: fixture[0].date_unix,
    },
    {
      id: fixture[1].id,
      name: fixture[1].name,
      date: fixture[1].date_unix,
    },
    {
      id: fixture[2].id,
      name: fixture[2].name,
      date: fixture[2].date_unix,
    },
  ]);

  t.end();
});

test("should return past launches", async (t) => {
  const app = await build(t);

  const mock = new MockAdapter(app.axios);
  mock
    .onGet("https://api.spacexdata.com/v5/launches/past")
    .reply(200, [fixture[0], fixture[1], fixture[2]]);

  const res = await app.inject({
    url: "/launches/past",
  });

  t.equal(res.statusCode, 200);
  t.same(JSON.parse(res.payload), [
    {
      id: fixture[0].id,
      name: fixture[0].name,
      date: fixture[0].date_unix,
    },
    {
      id: fixture[1].id,
      name: fixture[1].name,
      date: fixture[1].date_unix,
    },
    {
      id: fixture[2].id,
      name: fixture[2].name,
      date: fixture[2].date_unix,
    },
  ]);

  t.end();
});

test("should return same HTTP error", async (t) => {
  t.test("for a list of launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/").reply(404);

    const res = await app.inject({
      url: "/launches",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });

  t.test("for a specific launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/1").reply(404);

    const res = await app.inject({
      url: "/launches/1",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });

  t.test("for the next launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/next").reply(404);

    const res = await app.inject({
      url: "/launches/next",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });

  t.test("for the latest launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/latest").reply(404);

    const res = await app.inject({
      url: "/launches/latest",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });

  t.test("for upcoming launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/upcoming").reply(404);

    const res = await app.inject({
      url: "/launches/upcoming",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });

  t.test("for past launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/past").reply(404);

    const res = await app.inject({
      url: "/launches/past",
    });

    t.equal(res.statusCode, 404);
    t.end();
  });
});

test("should return 500 when network errors", async (t) => {
  t.test("for a list of launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/").networkError();

    const res = await app.inject({
      url: "/launches",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });

  t.test("for a specific launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/1").networkError();

    const res = await app.inject({
      url: "/launches/1",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });

  t.test("for the next launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/next").networkError();

    const res = await app.inject({
      url: "/launches/next",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });

  t.test("for the latest launch", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/latest").networkError();

    const res = await app.inject({
      url: "/launches/latest",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });

  t.test("for upcoming launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock
      .onGet("https://api.spacexdata.com/v5/launches/upcoming")
      .networkError();

    const res = await app.inject({
      url: "/launches/upcoming",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });

  t.test("for past launches", async (t) => {
    const app = await build(t);

    const mock = new MockAdapter(app.axios);
    mock.onGet("https://api.spacexdata.com/v5/launches/past").networkError();

    const res = await app.inject({
      url: "/launches/past",
    });

    t.equal(res.statusCode, 500);
    t.end();
  });
});
