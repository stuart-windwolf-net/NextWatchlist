/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  //pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals:{
    'ts-jest':{
      tsconfig: './tsconfig.jest.json',
    }
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.ts",
        "\\.(css|less)$": "<rootDir>/mocks/fileMock.ts"
      }
};