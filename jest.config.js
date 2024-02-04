module.exports = {
  // ...
  resolver: "jest-node-exports-resolver",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
