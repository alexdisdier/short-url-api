import isValidURL from "../src/utils/isValidURL";

describe("isValidURL function", () => {
  const wrongUrl = "testurl";
  const rightUrl = "www.testurl.com";

  it(`${wrongUrl}: is not a valid url`, () => {
    expect(isValidURL("notValidURL")).toBeFalsy();
  });
  it(`${rightUrl}: is a valid url`, () => {
    expect(isValidURL("www.testurl.com")).toBeTruthy();
  });
});
