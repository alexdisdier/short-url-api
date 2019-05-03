"use strict";
/* Jest testing
  $ npm test // launch test
  $ npm test --watchAll // launch and watch test
  Change package.json "test"
*/
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("../items");
describe("Items", function () {
    it("should return the first item", function () {
        expect(items_1.default.getFirstItem()).toBe("Item 1");
    });
});
