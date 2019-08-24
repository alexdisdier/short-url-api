"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidURL_1 = require("../src/utils/isValidURL");
describe("isValidURL function", () => {
    const wrongUrl = "testurl";
    const rightUrl = "www.testurl.com";
    it(`${wrongUrl}: is not a valid url`, () => {
        expect(isValidURL_1.default("notValidURL")).toBeFalsy();
    });
    it(`${rightUrl}: is a valid url`, () => {
        expect(isValidURL_1.default("www.testurl.com")).toBeTruthy();
    });
});
