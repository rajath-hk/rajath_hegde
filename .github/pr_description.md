This PR adds accessibility improvements and CI enhancements.

Summary of changes:

- Make window header indicators accessible and interactive (close/minimize/maximize buttons) with aria-labels and keyboard focus.
- Make avatars accessible (role="img" + aria-label) and include non-color icons.
- Add lint and typecheck steps to CI workflow.
- Add an export + smoke-check step to CI to verify static export produced `out/index.html`.
- Add accessibility guidance to CONTRIBUTING.md.

Why:
- Improve accessibility for screen-reader and keyboard users.
- Catch build/lint/type errors earlier in CI and add a basic smoke check for the exported static site.

How to test locally:

```powershell
# build and export
npm ci
npm run build
npm run export
# run smoke check
node scripts/smoke-check.js
```

If you prefer a different smoke test (e.g., HTTP ping after starting a server), I can update the workflow accordingly.