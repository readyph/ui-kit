# Changesets

This folder holds [Changesets](https://github.com/changesets/changesets) — one
Markdown file per unreleased change, describing the version bump and a summary for
the changelog.

Add one after making a change:

```bash
npx changeset
```

`@readyph/ui` and `@readyph/design-tokens` are **version-locked** (`fixed` in
`config.json`), so a bump to either releases both at the same version.

The Release workflow consumes these on `main`: it opens a "Version Packages" PR
that applies the bumps and changelogs; merging it builds and publishes.
