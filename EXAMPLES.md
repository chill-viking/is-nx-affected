# chill-viking/is-nx-affected examples

## Basic example

```yaml
jobs:
  use_github_action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Required to be able to compare base in Nx

      - run: npm ci

      - id: check_affected
        uses: chill-viking/is-nx-affected@v1.0.0
        with:
          project: project-name # Required, the Nx project name you're targeting
          base: origin/main     # Optional, the base branch or tag to compare against. Defaults to 'origin/main'

      - if: steps.check_affected.outputs.is-affected == 'true'
        run: |
          echo "Create new release of project-name"
```
