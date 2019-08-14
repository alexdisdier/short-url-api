module.exports = {
  clearMocks: true,
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["js", "ts"],
  // roots: ["dist/test"],
  testMatch: ["**/test/**/*.test.(ts)"], // add (ts|js) if you want to run on both
  testEnvironment: "node"
};
