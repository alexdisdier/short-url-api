import * as app from "../src/app";
import * as request from "supertest";
import * as http from "http";

import * as faker from "faker";

import { ROUTE_URL, ROUTE_UPDATE } from "../src/constant/routes";

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

  describe("basic route tests", () => {
    test("get home route GET /", async () => {
      const response = await request(app).get("/");
      const home =
        '{"home":{"message":"Welcome to AD SHORT-URL API","urlList":"/url"}}';
      expect(response.status).toEqual(200);
      expect(response.text).toContain(home);
    });
  });

  /**
   * Testing root endpoint
   */
  describe("GET route /", () => {
    it("responds with a welcoming message", done => {
      request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
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

    // it("throws if network is down", done => {
    //   request(app)
    //     .get(ROUTE_URL)
    //     .set("DENY", "application/json")
    //     .expect("Content-Type", /json/)
    //     .expect(500, done);
    // });
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
