module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/test/**/*.test.(ts)"], // add (ts|js) if you want to run on both
  testEnvironment: "node"
};
