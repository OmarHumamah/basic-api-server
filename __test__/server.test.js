"use strict";

const { server } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(server);
const { database } = require("../src/models/index");

// before any of the test create a connection
beforeAll(async () => {
  await database.sync();
});

// after all the tests are done
afterAll(async () => {
  await database.drop();
});

describe("Web server", () => {
  // Check if 404 is handled

  test("Should respond with 404 status on an invalid method", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });

  // test if can create a person

  it("can add a person", async () => {
    const response = await mockRequest.post("/food").send({
      meal: "mashed potato",
      calories: "0cal",
    });

    expect(response.status).toBe(201);
  });

  // test if can read

  it("can get all people", async () => {
    const response = await mockRequest.get("/food");

    expect(response.status).toBe(200);
  });

  // test if can read one person
  it("can get all record", async () => {
    const response = await mockRequest.get("/food/1");

    expect(response.status).toBe(200);
  });

  // test if can update a person
  it("can update a record", async () => {
    const response = await mockRequest.put("/food/1").send({
      meal: "mashed potato",
      calories: "3cal",
    });

    expect(response.status).toBe(201);
  });
  // test if can delete a person
  it("can delete a record", async () => {
    const response = await mockRequest.delete("/food/1");

    expect(response.status).toBe(204);
  });

  test("can add a person", async () => {
    const response = await mockRequest.post("/clothes").send({
      pice: "jacket",
      brand: "zara",
    });

    expect(response.status).toBe(201);
  });

  // test if can read

  it("can get all people", async () => {
    const response = await mockRequest.get("/clothes");

    expect(response.status).toBe(200);
  });

  // test if can read one person
  it("can get all record", async () => {
    const response = await mockRequest.get("/clothes/1");

    expect(response.status).toBe(200);
  });

  // test if can update a person
  it("can update a record", async () => {
    const response = await mockRequest.put("/clothes/1").send({
      pice: "shirt",
      brand: "zara",
    });

    expect(response.status).toBe(201);
  });
  // test if can delete a person
  it("can delete a record", async () => {
    const response = await mockRequest.delete("/clothes/1");

    expect(response.status).toBe(204);
  });
});
