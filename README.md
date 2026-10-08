# TaskPulse - Sample HTML/CSS/JS CI/CD Project

A modern, light-weight HTML5, CSS3, and ES6 JavaScript web application equipped with an automated **GitHub Actions CI/CD Workflow** (`.github/workflows/build-and-test.yml`) that triggers on every `push` and `pull_request`.

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── build-and-test.yml   # GitHub Actions CI pipeline configuration
├── css/
│   └── style.css                # Custom glassmorphism & responsive CSS styling
├── js/
│   ├── taskManager.js           # Pure JS state & logic manager
│   └── app.js                   # DOM event handling & rendering
├── scripts/
│   └── build.js                 # Automated build script (creates ./dist bundle)
├── tests/
│   └── taskManager.test.js      # Automated unit test suite using Node test runner
├── index.html                   # Main HTML5 entry point
├── package.json                 # Project configuration and test/build scripts
├── .gitignore                   # Git ignore patterns
└── README.md                    # Project documentation
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

The workflow file located at `.github/workflows/build-and-test.yml` automatically executes on every commit pushed to `main` or `master`:

1. **Environment Setup**: Provisions `ubuntu-latest` with Node.js `20`.
2. **Dependency Installation**: Runs `npm install`.
3. **Automated Testing**: Executes `npm test` to verify zero regression.
4. **Automated Build**: Executes `npm run build` to ensure static bundling succeeds.

---

## 🚀 How to Create and Push to GitHub

Follow these steps to connect this local repository to GitHub:

### Step 1: Initialize Git Local Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Sample HTML/CSS/JS project with GitHub Actions CI/CD"
git branch -M main
```

### Step 2: Create a GitHub Repository
1. Go to [GitHub New Repository](https://github.com/new).
2. Enter repository name: `cicd-sample-project` (or your preferred name).
3. Leave "Add a README file" unchecked (since we already have one).
4. Click **Create repository**.

### Step 3: Link & Push Local Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Once pushed, open the **Actions** tab on your GitHub repository page to see your CI pipeline automatically building and testing your code!
