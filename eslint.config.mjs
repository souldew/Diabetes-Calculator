// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // args: "all",
          // argsIgnorePattern: "^_",
          // caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          // destructuredArrayIgnorePattern: "^_",
          // varsIgnorePattern: "^_",
          // "ignoreRestSiblings": true
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  }
);
