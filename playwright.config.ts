import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    // Use the system Chrome install; runs headed locally so the journey is
    // visible, and headless in CI.
    channel: "chrome",
    headless: !!process.env.CI,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chrome", use: { ...devices["Desktop Chrome"] } },
  ],
  // Serves the production build; falls back to reusing an already-running server.
  // --webpack because Turbopack's build workers need port binding, which is
  // not permitted in every sandbox; webpack works everywhere.
  webServer: {
    command: "npm run build -- --webpack && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
