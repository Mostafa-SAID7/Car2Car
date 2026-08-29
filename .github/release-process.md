# Release process

Releases are created automatically by the [`release.yml`](workflows/release.yml) workflow on every push to `main` or `master`.

The workflow uses [`github-tag-action`](https://github.com/mathieudutour/github-tag-action) to bump the version tag based on Conventional Commits, then [`release-action`](https://github.com/ncipollo/release-action) to publish the GitHub release with an auto-generated changelog.

Use Conventional Commits so versions are calculated correctly:

- `feat:` → minor bump (e.g. `1.1.0`)
- `fix:` or `perf:` → patch bump (e.g. `1.0.1`)
- `feat!:` or `BREAKING CHANGE:` → major bump (e.g. `2.0.0`)
- `docs:`, `test:`, `chore:`, `refactor:`, `style:` → patch bump (default)

Do not create manual version tags or edit generated release commits.
