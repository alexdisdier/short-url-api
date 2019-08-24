import isValidURL from "../src/utils/isValidURL";

import { lorem, internet } from "faker";

describe("isValidURL function", () => {
  it(`${lorem.word()}: is not a valid url`, () => {
    expect(isValidURL("notValidURL")).toBeFalsy();
  });
  it(`${internet.url()}: is a valid url`, () => {
    expect(isValidURL("www.testurl.com")).toBeTruthy();
  });
});
