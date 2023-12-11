## chill-viking/is-nx-affected

![CI](https://github.com/chill-viking/is-nx-affected/actions/workflows/ci.yml/badge.svg)

--

## Archived

This repository has been made as read-only. Not really as useful as I thought it would be, although keeping around as a sort of snippet.

Welcome to the `chill-viking/is-nx-affected` GitHub Action!

### Overview

This action checks if a specified project in your Nx monorepo is affected by changes in the current branch compared to a chosen base branch or tag. The default base is 'origin/main'.

### Usage

```yaml
name: 'Has my-nx-project been affected?'
uses: chill-viking/is-nx-affected@v1
with:
  project: 'my-nx-project'
  base: 'my-release-tag'
```

#### Inputs

| Name      | Required           | Description                                                             |
|-----------|--------------------|-------------------------------------------------------------------------|
| `project` | :white_check_mark: | The Nx project name you're targeting.                                   |
| `base`    | :x:                | The base branch or tag to compare against. Defaults to `'origin/main'`. |

#### Outputs

| Name                | Description                                                              |
|---------------------|--------------------------------------------------------------------------|
| `is-affected`       | `'true'` if the project has been affected, `'false'` otherwise.          |
| `affected-projects` | A comma-separated list of affected projects. Empty if none are affected. |

Make sure to check out the [examples](EXAMPLES.md) for more detailed workflow.

### License

This action is provided under the MIT License. See the [LICENSE](LICENSE) for more details.

### Contributing

While this action is currently very simple, I'm open to suggestions for improvements. Feel free to open an issue or a pull request.

### Contributors

[![contributors](https://contrib.rocks/image?repo=chill-viking/is-nx-affected)](https://github.com/chill-viking/is-nx-affected/graphs/contributors)
