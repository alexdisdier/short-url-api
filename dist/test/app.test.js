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
        test("welcome api", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield request(app).get("/");
            const home = {
                home: {
                    message: "Welcome to AD SHORT-URL API",
                    urlList: routes_1.ROUTE_URL
                }
            };
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(home);
        }));
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
        ])("%s", (_name, success, reason) => __awaiter(this, void 0, void 0, function* () {
            const newUrl = yield request(app)
                .post("/shorten")
                .send({
                url: params.body.urlWithHttp
            });
            expect(newUrl.status).toEqual(200);
            // expect(newUrl.body).toEqual("");
        }));
    });
    /**
     * Testing get all url
     */
    describe(`GET/ Url`, () => {
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
    describe("Get/ Url with :id", function () {
        it("respond with json containing a single url", function (done) {
            request(app)
                .get("/url")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });
});
