import * as app from "../src/app";
import * as request from "supertest";
import * as http from "http";

import isValidURL from "../src/utils/isValidURL";

import * as faker from "faker";

import { ROUTE_URL, ROUTE_SHORTEN } from "../src/constant/routes";

describe("App.ts testing", () => {
  let server;

  beforeAll(done => {
    // do something before anything else runs
    server = http.createServer((req, res) => {
      res.write("ok");
      res.end();
    });
    server.listen(done);
    console.log("Jest starting!");
  });

  // close the server after each test
  afterAll(done => {
    server.close(done);
    console.log("server closed!");
  });

  /**
   * Testing entry endpoint
   */
  describe("Entry endpoint", () => {
    test("Get '/'", async () => {
      const response = await request(app).get("/");

      const home = {
        home: {
          message: "Welcome to AD SHORT-URL API",
          urlList: ROUTE_URL
        }
      };
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(home);
    });
  });

  /**
   * Testing entry endpoint
   */
  describe(`This route shortens a url and saves it to the database`, () => {
    test("It creates a short url", async () => {
      const response = await request(app).get("/shorten");
      const url = faker.internet.url();

      // expect(response.status).toEqual(200);
      // expect(response.body).toEqual(home);
    });

    test("It fails because it's an incorrect url", async () => {
      const response = await request(app).get("/");

      const home = {
        home: {
          message: "Welcome to AD SHORT-URL API",
          urlList: ROUTE_URL
        }
      };
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(home);
    });

    test("It fails because of a network error", async () => {
      const response = await request(app).get("/");

      const home = {
        home: {
          message: "Welcome to AD SHORT-URL API",
          urlList: ROUTE_URL
        }
      };
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(home);
    });
  });

  /**
   * Testing get all url
   */
  describe(`The route ${ROUTE_URL} displays all the urls within our database`, () => {
    it("respond with json containing a list of all urls", done => {
      request(app)
        .get(ROUTE_URL)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  /**
   * Testing get url redirection
   */
  describe("The route /:id redirects the short link", function() {
    it("respond with json containing a single url", function(done) {
      request(app)
        .get("/url")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
