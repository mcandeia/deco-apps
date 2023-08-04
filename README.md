# Creating Deco Apps - Example Repository

This repository serves as an example of how to create Deco "Apps" – bundles of functions (actions, sections, loaders, workflows, handlers, or any other Deco components) that can be imported and configured by any Deco site. Apps provide a powerful way to package and share functionality across different projects.

## Introduction

Deco Apps are self-contained bundles of reusable code that can be easily imported and configured into Deco sites. These Apps can include various components, such as actions, sections, loaders, and more, to extend the functionality of your Deco projects.

## Repository Structure

This example repository demonstrates the structure and setup of Deco Apps. It includes the following files:

### `deno.json`

The `deno.json` file contains various Deno tasks to facilitate the development process. Notably, the `deno task start` command bundles the apps and generates the necessary files to make the app usable by any site. The `deno task link $target` command links all apps to the given target folder, making them usable by the target folder.

### `deco.ts`

The `deco.ts` file specifies the names of the apps and their corresponding directories. This file plays a vital role in defining the configuration of the Apps.

### `bin/state.ts`

This file contains the shared state of the app, represented by the `State` interface. Any action, loader, or section within the app will receive this state as a "context" along with attributes like `get`, `invoke`, and `response`.

### `bin/loaders/bin.ts`

This is an example of a loader within the app that fetches data using the URL configured on the shared state and the status received as props.

### Generated Files

The repository also contains two generated files:

#### `bins/deco.app.ts`

This file serves as the app entry point and includes the manifest of components within the app. It should not be manually edited, as it is automatically updated during development.

#### `bins/doccache.zst`

This is the cache file used to generate the JSON schema at runtime.

## Getting Started

To begin using this example repository, follow these steps:

1. Clone the repository to your local machine.
2. Use the Deno tasks defined in `deno.json` to build and link the apps.
3. Customize the Apps to include your desired components, such as actions, sections, and loaders.
4. Import and configure the Apps in your Deco sites to leverage the shared functionality across projects.

## Conclusion

Deco Apps offer a powerful way to organize and share functionality across Deco sites. By bundling components into reusable Apps, you can streamline development and enhance code modularity. Feel free to explore and experiment with this example repository to discover how Deco Apps can elevate your Deco projects to the next level. Happy coding! 🚀
