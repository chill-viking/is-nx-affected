## chill-viking/is-nx-affected

![CI](https://github.com/chill-viking/is-nx-affected/actions/workflows/ci.yml/badge.svg)

> This action is currently a work in progress, please come back soon.

<!--
Ahoy, fellow Viking of Code! 🛡️

Introducing the `chill-viking/is-nx-affected` GitHub Action, your trusty companion on the quest to conquer Nx monorepos! 🏰

### What's the Scoop?

This action is your treasure map to determine whether a specific `project` in your Nx monorepo is affected by changes in the current branch,
compared to a chosen `base` branch or tag. And guess what?
The default `base` is set to `'main'` because, well, it's the main course of our adventure! 🍖

### How to Unleash the Viking Power

To summon this mighty action in your GitHub workflow, follow these steps:

**Inputs**: Craft your spell in the workflow YAML with these enchanting inputs:

| Name      | Required | Description                                                      |
|-----------|----------|------------------------------------------------------------------|
| `project` | :check:  | The Nx project name you're targeting.                            |
| `base`    | :x:      | The base branch or tag to compare against. Defaults to `'main'`. |

**Outputs**: The action will cast a spell and set these outputs:

| Name                | Description                                                              |
|---------------------|--------------------------------------------------------------------------|
| `is-affected`       | `'true'` if the project has been affected, `'false'` otherwise.          |
| `affected-projects` | A comma-separated list of affected projects. Empty if none are affected. |

 ```yaml
 jobs:
   build:
   runs-on: ubuntu-latest
   steps:
     - name: 'Has my-nx-project been affected?'
       uses: chill-viking/is-nx-affected@v1
       with:
         project: 'my-nx-project'
         base: 'develop'

     - name: 'Release my-nx-project'
       if: steps.is-nx-affected.outputs.is-affected == 'true' # Only run if the project has been affected
       run: |
         echo 'Releasing my-nx-project...'
 ```

### License to Sail the Code Sea

This GitHub Action is all about freedom! It sails under the MIT License flag. Dive into the [LICENSE](LICENSE) scroll for all the nitty-gritty details.

### Join the Viking Crew

Contributions? Sure, why not! Although we're not actively recruiting shipmates at the moment, feel free to use this action, modify it, and maybe, just maybe, you'll become a legendary Viking coder in your own right! ⚔️

-->

### Contributors

[![contributors](https://contrib.rocks/image?repo=chill-viking/is-nx-affected)](https://github.com/chill-viking/is-nx-affected/graphs/contributors)
