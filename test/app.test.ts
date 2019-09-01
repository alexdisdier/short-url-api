import * as app from "../src/app";
import * as request from "supertest";
import * as http from "http";

import isValidURL from "../src/utils/isValidURL";

import * as faker from "faker";

import { ROUTE_URL, ROUTE_SHORTEN } from "../src/constant/routes";

describe("App.ts testing", () => {
  let server;

  let params = {
    body: {
      urlWithHttp: "https://www.url.com",
      urlWithoutHttp: "www.url.com"
    },
    param: {
      id: "45JJU"
    }
  };

  beforeAll(done => {
    // do something before anything else runs
    server = http.createServer((req, res) => {
      res.write("ok");
      res.end();
    });
    server.listen(done);
  });

  // close the server after each test
  afterAll(done => {
    server.close(done);
  });

  /**
   * Testing entry endpoint
   */
  describe("GET/ Entry endpoint", () => {
    test("welcome api", async () => {
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
  describe(`POST/ Shorten`, () => {
    it.each([
      [
        "It succeeds in creating a short url and saves it to the database",
        true,
        null
      ],
      ["It fails because it's an incorrect url", false, "incorrect url"],
      ["It fails because of a network error", false, "network error"]
    ])("%s", async (_name, success, reason) => {
      const newUrl = await request(app)
        .post("/shorten")
        .send({
          url: params.body.urlWithHttp
        });

      expect(newUrl.status).toEqual(200);
      // expect(newUrl.body).toEqual("");
    });
  });

  /**
   * Testing get all url
   */
  describe(`GET/ Url`, () => {
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
  describe("Get/ Url with :id", function() {
    it("respond with json containing a single url", function(done) {
      request(app)
        .get("/url")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
