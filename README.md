# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1.  **Create a GitHub Repository:** If you haven't already, create a new repository on your GitHub account.

2.  **Push Your Code:** Push your project's code to the new repository.
    ```bash
    # Replace with your repository URL
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    git branch -M main
    git push -u origin main
    ```

3.  **Enable GitHub Pages:**
    *   In your repository on GitHub, go to `Settings` > `Pages`.
    *   Under "Build and deployment", select `GitHub Actions` as the `Source`.
    *   GitHub will automatically detect the `deploy.yml` workflow file and start the deployment process on your next push to `main`.

4.  **Done!** After the action completes (it may take a few minutes), your portfolio will be live at the URL provided on the Pages settings screen.
