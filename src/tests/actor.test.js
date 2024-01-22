const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors devuelve todos los actotes", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
  const actor = {
    firstName: "actor test",
    lastName: "actor test",
    nationality: "testing",
    image: "test.jpg",
    birthday: "2024-01-12",
  };

  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("UPDATE /actors/:id debe actualizar un actor", async () => {
  const actor = {
    firstName: "actor test actualizado",
  };

  const res = await request(app).put(`/actors/${id}`).send(actor);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actor.firstName);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);

  expect(res.status).toBe(204);
});
