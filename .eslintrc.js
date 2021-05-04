module.exports = {
  ignorePatterns: ["node_modules", "lib"],
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      env: {
        browser: true,
        es2020: true,
        node: true,
      },
      files: ["src/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
      ],
    },
    {
      env: {
        browser: true,
        es2020: true,
        node: true,
      },
      files: ["**/*.js"],
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
    },
  ],
};
