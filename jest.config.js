module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // RTL や jest-dom 用
  moduleNameMapper: {
    // Vite の alias を Jest 用にマッピング
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
