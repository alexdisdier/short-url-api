"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("../src/app");
const request = require("supertest");
const routes_1 = require("../src/constant/routes");
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
describe(`GET route ${routes_1.ROUTE_URL}`, () => {
    it("respond with json containing a list of all urls", done => {
        request(app)
            .get(routes_1.ROUTE_URL)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
/**
 * Testing get url redirection
 */
describe("GET /:id", function () {
    it("respond with json containing a single url", function (done) {
        request(app)
            .get("/url")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
