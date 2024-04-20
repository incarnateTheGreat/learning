import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "https://localhost:3000"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
