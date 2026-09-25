# GitHub Actions workflows

Operational reference for the CI/CD workflows in this directory. Contributor-facing
documentation is in [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Workflows

| Workflow | Triggers | Purpose |
| --- | --- | --- |
| `ci.yml` | pull requests; pushes to `master` | Lint, Karma unit tests, library production build, documentation build. Uploads `dist-library` and `dist-docs` artifacts. |
| `docs-preview.yml` | pushes to any branch except `master`/`gh-pages`; branch `delete`; weekly schedule; manual dispatch | Publishes a per-branch documentation preview to the `gh-pages` branch under `ci/previews/<slug>/` and maintains a sticky pull-request comment with the URL. Cleans previews up on branch deletion, plus a weekly sweep for orphaned or stale (>60 days without a push) previews. |
| `docs-publish.yml` | `workflow_call` (from `release.yml`); manual dispatch | Builds the documentation at the site root base href and deploys it to the `gh-pages` branch **root** with `keep_files` so previews survive. |
| `release.yml` | `v*` tag push; manual dispatch | Quality gates (lint, tests, builds) from the tag → Verdaccio publish rehearsal with a scratch install of the packed artifact → npm publication (environment-gated) → production documentation deploy. |

## Design notes

-   **Branch slug**: previews are keyed by branch, not pull request. The slug is the branch
    name with every character outside `[A-Za-z0-9._]` replaced by `-`. The same computation
    appears in the deploy, cleanup and sweep jobs and must be kept identical.
-   **The public docs site only changes on release.** `docs-publish.yml` runs as the final
    release job; nothing else writes to the `gh-pages` root. `ci/previews/master/` provides a
    live view of unreleased master.
-   **Publish rehearsal**: the release publishes `@ux-aspects/ux-aspects` under its real name
    to an in-job Verdaccio using `.verdaccio/config.yml`, then installs it into a scratch
    package and asserts the artifact's shape. The `@ux-aspects/*` scope must stay
    unproxied in that config — with the npmjs uplink attached, republishing a version that
    already exists publicly fails with `E409 Conflict`.
-   **`npm publish ./dist/library`** — the leading `./` is required; without it npm parses
    `dist/library` as a GitHub `owner/repo` spec.
-   **Test publication target**: the publish job pushes to GitHub Packages, rewriting the
    package name to `@<owner>/ux-aspects` (GitHub Packages requires the scope to match the
    repository owner, and installs from it always require authentication — it is a staging
    target, not a distribution channel).

## Operational caveats

-   **`delete` and `schedule` triggers only fire once the workflow files are on the default
    branch.** Until then, branch-deletion cleanup does not run automatically; run the sweep
    manually with `gh workflow run docs-preview.yml --ref <branch>`.
-   **The `npm-publish` environment is created unprotected on first use.** Add required
    reviewers under *Settings → Environments → npm-publish* to enable the human approval gate
    before the publish job.
-   **gh-pages history growth**: preview deploys are additive commits. Squash the `gh-pages`
    branch history periodically if it grows large.
