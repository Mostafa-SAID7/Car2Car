# Release process

Releases are managed by Release Please from commits merged into `main` or `master`.

Use Conventional Commits so changes are grouped and versions are calculated consistently:

- `feat:` creates a minor release
- `fix:` creates a patch release
- `perf:` creates a patch release
- `feat!:` or `BREAKING CHANGE:` creates a major release
- `docs:`, `test:`, `chore:`, and `refactor:` do not create a release by themselves

Release Please opens one release pull request at a time. When that pull request is merged, it updates the package version and changelog, creates the corresponding `vX.Y.Z` tag, and publishes the GitHub release. The release configuration lives in `.github/release-please-config.json` and `.github/.release-please-manifest.json`. Do not create manual version tags or edit generated release commits.
