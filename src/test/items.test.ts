/* Jest testing
  $ npm test // launch test
  $ npm test --watchAll // launch and watch test
  Change package.json "test" 
*/

import Url, { IUrl } from "../url";
import Items from "../items";

describe("Items", function() {
  it("should return the first item", function() {
    expect(Items.getFirstItem()).toBe("Item 1");
  });
});
