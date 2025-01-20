import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/**"], // Ignora todos los archivos dentro de la carpeta 'dist'
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];