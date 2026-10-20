import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  { ignores: ["dist/", ".astro/", "node_modules/", "src/api/generated/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // TypeScript already resolves globals (ImageMetadata, astro:* modules).
      "no-undef": "off",
      // Pre-existing debt when linting was introduced: warnings, capped by
      // --max-warnings in the lint script. Lower the cap as files get fixed and
      // turn these back into errors once it reaches 0.
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "prefer-const": "warn",
      "prefer-rest-params": "warn",
      "no-var": "warn",
      "no-empty": "warn",
      "no-case-declarations": "warn",
      "no-useless-assignment": "warn",
      "astro/no-prerender-export-outside-pages": "warn",
    },
  },
);
