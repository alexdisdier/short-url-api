"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("../src/app");
const request = require("supertest");
const http = require("http");
const routes_1 = require("../src/constant/routes");
const server = http.createServer(app);
describe("starting and stopping server", () => {
    let server;
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        // do something before anything else runs
        server = http.createServer(app);
        server.listen(done);
        console.log("Jest starting!");
    }));
    // close the server after each test
    afterAll(done => {
        server.close(done);
        console.log("server closed!");
    });
    test("my test", () => __awaiter(this, void 0, void 0, function* () { }));
});
describe("basic route tests", () => {
    test("get home route GET /", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).get("/");
        const home = '{"home":{"message":"Welcome to AD SHORT-URL API","urlList":"/url"}}';
        expect(response.status).toEqual(200);
        expect(response.text).toContain(home);
    }));
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
describe(`GET route ${routes_1.ROUTE_URL}`, () => {
    it("respond with json containing a list of all urls", done => {
        request(app)
            .get(routes_1.ROUTE_URL)
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
describe("GET /:id", function () {
    it("respond with json containing a single url", function (done) {
        request(app)
            .get("/url")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
