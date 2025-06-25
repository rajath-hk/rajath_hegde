# RetroFolio: An Interactive Portfolio

This is an interactive portfolio built with Next.js and styled to look like a retro desktop operating system. It was created in Firebase Studio.

## Features
- Interactive desktop UI with movable icons and resizable windows.
- Dark and light mode support.
- Responsive design for different screen sizes.
- Pre-configured for easy deployment.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

---

## How to Deploy to GitHub Pages

This project is already configured for a simple, automated deployment to GitHub Pages. Just follow these steps:

### Step 1: Create a GitHub Repository

If you haven't already, create a new, empty repository on your GitHub account. Do **not** initialize it with a README or .gitignore file, as your project already has these.

### Step 2: Push Your Project Code

In your project folder on your computer, connect your local project to the GitHub repository and push your code.

```bash
# Make sure you are in your project directory

# Set the remote origin to your new repository's URL
# Replace YOUR_USERNAME and YOUR_REPOSITORY with your actual details
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Rename your primary branch to 'main' if it isn't already
git branch -M main

# Push your code to the 'main' branch on GitHub
git push -u origin main
```

### Step 3: Configure GitHub Pages Settings

This is the final and most important step to enable the automated deployment.

1.  Go to your new repository on the GitHub website.
2.  Click on the **`Settings`** tab.
3.  In the left sidebar, click on **`Pages`**.
4.  Under the "Build and deployment" section, for the **`Source`**, select **`GitHub Actions`**.

### That's It!

You're all set! The deployment workflow (defined in `.github/workflows/deploy.yml`) will automatically run every time you push a change to your `main` branch.

After the first push, the action will start. You can monitor its progress in the **`Actions`** tab of your repository. Once it's complete (it usually takes a couple of minutes), your portfolio will be live at the URL shown in the `Settings > Pages` screen. The URL will look something like this: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`.
