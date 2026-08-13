import { defineConfig, devices } from '@playwright/test';

/**
 * E2E sui tre percorsi utente critici (§6 del BRIEF).
 * In locale (ambiente remoto di sviluppo) il browser è pre-installato:
 * impostare PLAYWRIGHT_EXECUTABLE=/opt/pw-browsers/chromium se le versioni
 * non combaciano. In CI si usa `npx playwright install chromium --with-deps`.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // slash finale obbligatorio: i goto() nei test usano percorsi relativi
    // ("grafo", "voce/ficino") perché "/x" risolverebbe alla radice del dominio
    baseURL: 'http://localhost:4321/correspondentia-theatri/',
    trace: 'retain-on-failure',
    ...(process.env.PLAYWRIGHT_EXECUTABLE
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE } }
      : {}),
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx astro preview --port 4321',
    url: 'http://localhost:4321/correspondentia-theatri/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
