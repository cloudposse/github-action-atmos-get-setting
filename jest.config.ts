import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  verbose: true
};

export default config;
