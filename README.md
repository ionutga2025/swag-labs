# Playwright Test Automation Framework

This project contains automated test coverage for:

- Swag Labs UI flows
- Restful Booker API flows

The framework is built with:

- Playwright
- TypeScript
- Page Object Model (UI)
- API Client abstraction (API)

---

# Installation

Install project dependencies:

```bash
npm ci
```

---

# Run Tests Locally

Download the `.env` file provided via email and place it in the project root directory.

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run all tests:

```bash
npm run test:all
```

---

# Run Tests from GitHub Actions

1. Open the repository in GitHub
2. Navigate to `Actions`
3. Select:
   - `Swag Labs`
   - `Restful Booker`
4. Click `Run workflow`

---

# Project Structure

```txt
.github/
  workflows/
    restful-booker.yml
    swag-labs.yml

src/
  restful-booker/
    api/
    fixtures/
    models/
    test-data/

  swag-labs/
    fixtures/
    pages/

tests/
  restful-booker/
  swag-labs/
```
