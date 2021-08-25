# S3 File Processing Template - Node.js

This template provides the basis for processing files added to an S3 bucket using the 
[Claim Check pattern](https://altostra.com/blog/use-case-claim-check-pattern?utm_source=github&utm_medium=template).

## Before you begin

### 1. Create a free Altostra account
Go to [app.altostra.com](https://app.altostra.com?utm_source=github&utm_medium=template) to sign up for a free account.

### 2. Connect an AWS account
If you haven't connected an AWS account during sign up, you can do it on the 
[Cloud Integrations](https://app.altostra.com/team/settings/integrations/cloud?utm_source=github&utm_medium=template) page.

An AWS account is required to deploy projects.

### 3. Install the Altostra CLI
```sh
$ npm install -g @altostra/cli
```

## Using the template

1. Go to [projects](https://app.altostra.com/projects?utm_source=github&utm_medium=template).
1. Click **Create Project**.
1. Enter a project name and select `s3-file-processing-nodejs` from the list of templates.
1. Use the **Clone** button on the project page to obtain the Git repository URL after the project is created.
1. Clone the Git repository to you local machine.

## Deploying the project

Login to your account from the Altostra CLI:
```sh
$ alto login
```

Deploy a new project [stack](https://docs.altostra.com/reference/concepts/instances.html):

```sh
# run in the project dir
$ alto deploy prod --push --env
```

The `--push` option will auto-create a [version](https://docs.altostra.com/reference/concepts/project-image.html).  
The `--env` option will prompt you to select an [environment](https://docs.altostra.com/reference/concepts/environments.html) from a list.  

> _See the [Altostra CLI documentation](https://docs.altostra.com/reference/CLI/altostra-cli.html) for all available commands and options._

## Stack deployment status and details

#### From the CLI:
```sh
# list the stacks for the current project
$ alto stacks

# show details for the "prod" stack
$ alto stacks get prod
```

#### From the Web Console:
```sh
# open the current project page in Web Console
$ alto console
```

## Modifying the project
Modify the project using the Altostra extension for Visual Studio Code.  
The extension is available on the [Visual Studio marketplace](https://marketplace.visualstudio.com/items?itemName=Altostra.altostra).

To install the extension, search for _Altostra_ in the _Extensions_ view in Visual Studio Code.

Or, install it from the terminal:

```sh
$ code --install-extension Altostra.altostra
```

## Template content

### Source files
The Lambda functions source files are located in the `functions` directory.

## Contact
Submit issues and pull requests directly to this repository. You contribution is appreciated.

If you need further assistance, have questions or suggestions, you can reach us at [support@altostra.com](mailto:support@altostra.com).