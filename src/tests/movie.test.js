const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let id;

test("GET /movies debe traer todas peliculas", async () => {
  const res = await request(app).get("/movies");

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una pelicula", async () => {
  const movie = {
    name: "movie test",
    image: "test.jpg",
    synopsis: "synopsis test",
    releaseYear: 2024,
  };

  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("UPDATE /movies/:id debe actualizar una pelicula", async () => {
  const movie = {
    name: "movie test",
  };

  const res = await request(app).put(`/movies/${id}`).send(movie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("POST /movies/:id/actors debe insertar los actores a las peliculas", async () => {
  const actor = await Actor.create({
    firstName: "actor test prueba",
    lastName: "actor test prueba",
    nationality: "testing prueba",
    image: "testprueba.jpg",
    birthday: "2024-01-12",
  });

  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movie/:id/directors debe insertar directores a las peliculas", async () => {
  const director = await Director.create({
    firstName: "director purba",
    lastName: "director prueba",
    nationality: "testing",
    image: "testprueba.jpg",
    birthday: "2024-01-12",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres debe insertar generos a peliculas", async () => {
  const genre = await Genre.create({
    name: "genre test",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id elimina una pelicula", async () => {
  const res = await request(app).delete(`/movies/${id}`);

  expect(res.status).toBe(204);
});
