# TaskPulse - Sample HTML/CSS/JS CI/CD Project

A modern, light-weight HTML5, CSS3, and ES6 JavaScript web application equipped with an automated **GitHub Actions CI/CD & Deployment Workflow** (`.github/workflows/build-and-test.yml`) that builds, tests, and automatically deploys the site to **GitHub Pages** on every git push.

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── build-and-test.yml   # ⚙️ CI/CD Workflow (Build, Test & Deploy to GitHub Pages)
├── css/
│   └── style.css                # 🎨 Custom glassmorphism & responsive CSS styling
├── js/
│   ├── taskManager.js           # 🧠 Pure JS state & logic manager
│   └── app.js                   # 🔌 DOM event handling & rendering
├── scripts/
│   └── build.js                 # 🔨 Automated build script (creates ./dist bundle)
├── tests/
│   └── taskManager.test.js      # 🧪 Automated unit test suite using Node test runner
├── index.html                   # 🌐 Main HTML5 entry point
├── package.json                 # 📦 Project configuration and test/build scripts
├── .gitignore                   # 🙈 Git ignore patterns
└── README.md                    # 📖 Project documentation
```

---

## ⚡ Local Development Commands

### 1. Run Automated Unit Tests
```bash
npm test
```
*Runs 11 automated unit tests verifying task addition, deletion, toggle status, filtering, and productivity calculation.*

### 2. Run Automated Build Script
```bash
npm run build
```
*Validates project assets and compiles static production bundle into `./dist` folder.*

---

## 🤖 GitHub Actions Workflow Summary

The workflow file located at `.github/workflows/build-and-test.yml` features a 2-stage pipeline:

1. **`build-and-test` Job**:
   - Provisions `ubuntu-latest` with Node.js `20`.
   - Runs `npm install`, `npm test` (11 unit tests), and `npm run build`.
   - Uploads `./dist` static output using `actions/upload-pages-artifact@v3`.
2. **`deploy` Job**:
   - Depends on `build-and-test` (`needs: build-and-test`).
   - Automatically deploys the `./dist` bundle to **GitHub Pages** using `actions/deploy-pages@v4`.

---

## 🌐 Enabling GitHub Actions Deployment on GitHub

To ensure GitHub Actions is allowed to deploy to GitHub Pages:
1. Open your repository on GitHub: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. Push a new commit to trigger the automated build, test, and deployment!
