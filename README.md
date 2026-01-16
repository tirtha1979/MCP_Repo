# Playwright Test Automation - EPAM Website

This repository contains Playwright test automation scripts for testing the EPAM website navigation flow.

## 📋 Test Scenarios

### EPAM Client Work Navigation Test
This test automates the following user journey:
1. Navigate to EPAM homepage (https://www.epam.com/)
2. Click on "Services" in the header menu
3. Click on "Explore Our Client Work" link
4. Verify "Client Work" heading is visible on the page

## 🚀 Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tirtha1979/MCP_Repo.git
cd MCP_Repo
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run with UI mode (interactive)
```bash
npm run test:ui
```

### Run with headed browser (see the browser)
```bash
npm run test:headed
```

### Run in debug mode
```bash
npm run test:debug
```

### Run specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report
```bash
npm run test:report
```

## 📁 Project Structure

```
.
├── tests/
│   └── epam-client-work.spec.ts    # Main test file
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🔧 Configuration

The Playwright configuration (`playwright.config.ts`) includes:
- **Base URL**: https://www.epam.com
- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: 2 retries in CI environment
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Captured on first retry

## 📊 Test Reports

After running tests, an HTML report is automatically generated. View it with:
```bash
npm run test:report
```

## 🐛 Debugging

To debug tests:
1. Use `npm run test:debug` to run in debug mode
2. Use `npm run test:ui` for interactive UI mode
3. Check screenshots and videos in `test-results/` folder on failure

## 🔄 CI/CD Integration

The tests are configured to run in CI environments with:
- 2 retries on failure
- Single worker for stability
- Automatic screenshot and video capture on failure
- HTML report generation

### Example GitHub Actions workflow:
```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, feature/* ]
  pull_request:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 📝 Writing New Tests

To add new tests:
1. Create a new `.spec.ts` file in the `tests/` directory
2. Import Playwright test utilities: `import { test, expect } from '@playwright/test';`
3. Write your test scenarios using `test.describe()` and `test()`
4. Use `test.step()` for better reporting and organization

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('My Test Suite', () => {
  test('should do something', async ({ page }) => {
    await test.step('Step 1', async () => {
      await page.goto('/');
      // Your test code
    });
  });
});
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests to ensure they pass
4. Submit a pull request

## 📄 License

MIT

## 📧 Contact

For questions or issues, please open an issue in the repository.
