module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**test**/**/*.test.ts'],
    reporters: ["default"],
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: [
      "<rootDir>/setup_tests.ts"
    ]
}
