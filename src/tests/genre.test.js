const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres debe traer todos los generos", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un genero", async () => {
  const genre = {
    name: "name test",
  };

  const res = await request(app).post("/genres").send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(genre.name);
});

test("UPDATE /genres/:id debe actualizar un genero", async () => {
  const genre = {
    name: "test actualizado",
  };

  const res = await request(app).put(`/genres/${id}`).send(genre);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test("DELETE /genres/:id debe eliminar un usuario", async () => {
  const res = await request(app).delete(`/genres/${id}`);

  expect(res.status).toBe(204);
});
