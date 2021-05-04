# Contributing

> Before contributing, please read our [code of conduct](CODE_OF_CONDUCT.md).

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Setup

```bash
git clone git@github.com:ViacomInc/broadcast-calendar.git
cd broadcast-calendar
npm install
```

Once you are setup, you may run any of the npm scripts available.

## Running Tests

To run the unit tests you may run any of the following commands:

```bash
# runs all unit tests with test coverage
npm run test
```

## Code Standards

**Linting**

We are using [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for linting.

**Formatting**

We are using [Prettier](https://prettier.io) for javascript style formatting.

**Programming style**

Aside from trying to follow common Javascript best practices we have made an effort to follow a functional programming approach in our codebase, please help us continue with this pattern.

If you are new to Functional programming there is a lot of good documentation out there, but a good introduction is Eric Elliott's Functional Programming Series. You can start with [What is Functional Programming](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) and the more in depth [Composing Software](https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c#.2dfd6n6qe) posts are really good.

**Javascript API restrictions**

We want DataPoint to be accessible to users from Node 10.x and above, because of this we would like to stick to Node 10 LTS full compatibility without the use of any transpilers.

## Supported Node Versions

We will only be supporting the node versions mentioned on the engine field on the main package.json, please make sure the code you use is supported by this version.

## Pull Request Process

1. Fork it
2. Create your feature branch `git checkout -b feature/my-new-feature`
3. Commit your changes through `git commit`
4. Push to the branch `git push origin feature/my-new-feature`
5. Create a new [Pull Request](https://github.com/ViacomInc/broadcast-calendar/compare)

### Updating Documentation

Please update the respective README.md files with details of changes to the interface.

### Breaking changes

If your pull request includes a breaking change, please submit it with a [codemod](https://github.com/facebook/jscodeshift) under
broadcast-calendar-codemods that will help users upgrade their codebase.

Breaking changes without a codemod will not be accepted unless a codemod is not viable or does not apply to the specific situation.
