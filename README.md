

<!-- markdownlint-disable -->
# github-action-atmos-get-setting <a href="https://cpco.io/homepage?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content="><img align="right" src="https://cloudposse.com/logo-300x69.svg" width="150" /></a>
<a href="https://github.com/cloudposse/github-action-atmos-get-setting/releases/latest"><img src="https://img.shields.io/github/release/cloudposse/github-action-atmos-get-setting.svg" alt="Latest Release"/></a><a href="https://slack.cloudposse.com"><img src="https://slack.cloudposse.com/badge.svg" alt="Slack Community"/></a>
<!-- markdownlint-restore -->

<!--




  ** DO NOT EDIT THIS FILE
  **
  ** This file was automatically generated by the `cloudposse/build-harness`.
  ** 1) Make all changes to `README.yaml`
  ** 2) Run `make init` (you only need to do this once)
  ** 3) Run`make readme` to rebuild this file.
  **
  ** (We maintain HUNDREDS of open source projects. This is how we maintain our sanity.)
  **





-->

GitHub Action to retrieve a setting from [atmos](https://github.com/cloudposse/atmos) configuration.




## Introduction

GitHub Action to retrieve settings from [atmos](https://github.com/cloudposse/atmos) configuration. There are two ways
to use this action. The first is to retrieve a single setting and to get its value returned via the `value` output.
The second is to retrieve multiple settings as an object returned via the `settings` output.




## Usage

```
# Example stacks/dev.yaml
components:
  terraform:
    foo:
      settings:
        roleArn: arn:aws:iam::000000000000:role/MyRole
        secretsArn: arn:aws:secretsmanager:us-east-1:000000000000:secret:MySecret-PlMes3
      vars:
        foo: bar
```

```yaml
  name: Pull Request
  on:
    pull_request:
      branches: [ 'main' ]
      types: [opened, synchronize, reopened, closed, labeled, unlabeled]

  jobs:
    context:
      runs-on: ubuntu-latest
      steps:

        # The following example will return a single setting value of
        # `arn:aws:secretsmanager:us-east-1:000000000000:secret:MySecret-PlMes3` in the `value` output:
        - name: Get Atmos Single Setting for Secret ARN
          uses: cloudposse/github-action-atmos-get-setting@main
          id: example
          with:
            component: foo
            stack: core-ue1-dev
            settings-path: settings.secrets-arn

        # The following example will return an object with the following structure in the `settings` output:
        # {"secretsArn":"arn:aws:secretsmanager:us-east-1:000000000000:secret:MySecret-PlMes3", "roleArn":"arn:aws:iam::000000000000:role/MyRole"}
        - name: Get Atmos Multiple Settings
          uses: cloudposse/github-action-atmos-get-setting@main
          id: example
          with:
            settings: |
              - component: foo
                stack: core-ue1-dev
                settingsPath: settings.secrets-arn
                outputPath: secretsArn
              - component: foo
                stack: core-ue1-dev
                settingsPath: settings.secrets-arn
                outputPath: roleArn

```

## Migrating from `v0` to `v1`

Starting from `v1` the action is no longer restricted to retrieving the component config from only the `settings` section.
If you want the same behavior in `v1`  as in`v0`, you should add the `settings.` prefix to the value of the `settings-path` variable.
For example, in `v1` you would provide `settings.secrets-arn` as the value to the `settings-path`
```yaml
  - name: Get Atmos Setting for Secret ARN
    uses: cloudposse/github-action-atmos-get-setting@v1
    id: example
    with:
      component: foo
      stack: core-ue1-dev
      settings-path: settings.secrets-arn
```

Which would provide the same output as passing only `secrets-arn` in `v0`

```yaml
  - name: Get Atmos Setting for Secret ARN
    uses: cloudposse/github-action-atmos-get-setting@v0
    id: example
    with:
      component: foo
      stack: core-ue1-dev
      settings-path: secrets-arn
```






<!-- markdownlint-disable -->

## Inputs

| Name | Description | Default | Required |
|------|-------------|---------|----------|
| component | The atmos component extract the settings for. | N/A | false |
| settings | The settings to extract. | N/A | false |
| settings-path | The settings path using JSONPath expressions. | N/A | false |
| stack | The atmos stack extract the settings for. | N/A | false |


## Outputs

| Name | Description |
|------|-------------|
| settings | The settings values when multiple settings are returned. |
| value | The value of the setting when a single setting is returned. |
<!-- markdownlint-restore -->


## Related Projects

Check out these related projects.



## References

For additional context, refer to some of these links.

- [github-actions-workflows](https://github.com/cloudposse/github-actions-workflows) - Reusable workflows for different types of projects




## ✨ Contributing

This project is under active development, and we encourage contributions from our community.



Many thanks to our outstanding contributors:

<a href="https://github.com/cloudposse/github-action-atmos-get-setting/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cloudposse/github-action-atmos-get-setting&max=24" />
</a>

For 🐛 bug reports & feature requests, please use the [issue tracker](https://github.com/cloudposse/github-action-atmos-get-setting/issues).

In general, PRs are welcome. We follow the typical "fork-and-pull" Git workflow.
 1. Review our [Code of Conduct](https://github.com/cloudposse/github-action-atmos-get-setting/?tab=coc-ov-file#code-of-conduct) and [Contributor Guidelines](https://github.com/cloudposse/.github/blob/main/CONTRIBUTING.md).
 2. **Fork** the repo on GitHub
 3. **Clone** the project to your own machine
 4. **Commit** changes to your own branch
 5. **Push** your work back up to your fork
 6. Submit a **Pull Request** so that we can review your changes

**NOTE:** Be sure to merge the latest changes from "upstream" before making a pull request!

### 🌎 Slack Community

Join our [Open Source Community](https://cpco.io/slack?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content=slack) on Slack. It's **FREE** for everyone! Our "SweetOps" community is where you get to talk with others who share a similar vision for how to rollout and manage infrastructure. This is the best place to talk shop, ask questions, solicit feedback, and work together as a community to build totally *sweet* infrastructure.

### 📰 Newsletter

Sign up for [our newsletter](https://cpco.io/newsletter?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content=newsletter) and join 3,000+ DevOps engineers, CTOs, and founders who get insider access to the latest DevOps trends, so you can always stay in the know.
Dropped straight into your Inbox every week — and usually a 5-minute read.

### 📆 Office Hours <a href="https://cloudposse.com/office-hours?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content=office_hours"><img src="https://img.cloudposse.com/fit-in/200x200/https://cloudposse.com/wp-content/uploads/2019/08/Powered-by-Zoom.png" align="right" /></a>

[Join us every Wednesday via Zoom](https://cloudposse.com/office-hours?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content=office_hours) for your weekly dose of insider DevOps trends, AWS news and Terraform insights, all sourced from our SweetOps community, plus a _live Q&A_ that you can’t find anywhere else.
It's **FREE** for everyone!
## License

<a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge" alt="License"></a>

<details>
<summary>Preamble to the Apache License, Version 2.0</summary>
<br/>
<br/>

Complete license is available in the [`LICENSE`](LICENSE) file.

```text
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
```
</details>

## Trademarks

All other trademarks referenced herein are the property of their respective owners.


---
Copyright © 2017-2024 [Cloud Posse, LLC](https://cpco.io/copyright)


<a href="https://cloudposse.com/readme/footer/link?utm_source=github&utm_medium=readme&utm_campaign=cloudposse/github-action-atmos-get-setting&utm_content=readme_footer_link"><img alt="README footer" src="https://cloudposse.com/readme/footer/img"/></a>

<img alt="Beacon" width="0" src="https://ga-beacon.cloudposse.com/UA-76589703-4/cloudposse/github-action-atmos-get-setting?pixel&cs=github&cm=readme&an=github-action-atmos-get-setting"/>
