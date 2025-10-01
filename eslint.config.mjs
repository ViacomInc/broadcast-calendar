// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build/*"] },
  {
    files: ["rollup.config.ts", "lib/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      {
        rules: {
          "functional/no-mixed-types": ["off"],
          "@typescript-eslint/restrict-template-expressions": [
            "error",
            { allowNumber: true },
          ],
        },
      },
    ],
  },
);
