"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("../src/items");
describe("Items", function () {
    it("should return the first item", function () {
        expect(items_1.default.getFirstItem()).toBe("Item 1");
    });
});
