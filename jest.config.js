export default {
  testEnvironment: "jsdom",

  transform: {
    "^.+\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  moduleNameMapper: {
    "\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.cjs",
    "^.+\.svg$": "<rootDir>/test/svgMock.cjs",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
