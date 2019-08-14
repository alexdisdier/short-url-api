import functions from "../src/functions";

// toBe
test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

// not toBe
test("Adds 2 + 2 to NOT equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

/*
  CHECK FOR TRUTHY & FALSY VALUES
  - toBeNull matches only null
  - toBeUndefined matches only undefined
  - toBeDefined is the opposite of toBeUndefined
  - toBeTruthy matches anything that an if statement treats as true
  - toBeFalsy matches anything that an if statement treats as false
*/

// toBeNull
test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

// toBeFalsy
test("Should be false", () => {
  expect(functions.checkValue(0)).toBeFalsy();
});

// toEqual
test("User should be Brad Traversy object", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Brad",
    lastName: "Traversy"
  });
});
