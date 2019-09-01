"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidURL_1 = require("../src/utils/isValidURL");
const faker_1 = require("faker");
describe("isValidURL function", () => {
    it(`${faker_1.lorem.word()}: is not a valid url`, () => {
        expect(isValidURL_1.default("notValidURL")).toBeFalsy();
    });
    it(`${faker_1.internet.url()}: is a valid url`, () => {
        expect(isValidURL_1.default("www.testurl.com")).toBeTruthy();
    });
});
