> Nrwl Technologies

# Nx Workshop - Preparation Guide

## Workshop Outline

### 1. Why a Workspace

The benefits of a mono repo, from atomic changes and single versioning of dependencies to explicit public APIs and full system testing.

### 2. Organzing Code in a Workspace **(with Code Labs)**

How Nx helps to create and grow a mono repo workspace with apps and libs, patterns and conventions for libs, and how to serve/build/deploy different apps within the workspace.

### 3. RxJS **(with Code Labs)**

Understanding observable concepts and operators and how they play a role in Angular applications, how to import operators and compose them to get the data you need, the async pipe, and how to create observables.

### 4. Why NgRx **(with Code Labs)**

What is NgRx and the benefits we get by using NgRx (and a redux
pattern), from leveraging observables without writing observables to
simplification of component logic and powerful debugging through the clear
visibility of state changes and order of operations.

Learn the scaffolding of NgRx implementation: store, reducer, actions, selectors, effects. How Nx helps to generate those as well as how to structure store data models, immutability and breaking the store up by features.

## Local Environment Requirements

The following are required to be able to work with the workshop code on your local machine:

- Node.js
- git
- `@angular/cli` and `@nrwl/workspace` installed globally (using NPM or Yarn)

```
npm i -g @angular/cli @nrwl/workspace
```

### Recommended Tools

We also recommend the following for purposes of our workshop (but will not be a strict requirement):

- VS Code
- Angular Console VS Code Plugin or Desktop App

## The Project Code

We will be working with an existing Nx Workspace project repo during the workshop that can be found at:

> https://github.com/nrwl/workshop-nx-starter

### Pulling down the code

You can clone the repo onto your local machine by using the following git command at the terminal:

```
git clone https://github.com/nrwl/workshop-nx-starter.git
```

### Installing dependencies

Once you have that cloned you will want to change to that directory and use NPM (or Yarn) to install the project dependencies:

```
cd ./workshop-nx-starter
yarn install
```

### Confirming the set up

There are two Angular applications in the repo to start with, a customer portal and a reporting app. There is also a NestJs server app for the data API. After cloning the repo and installing the dependencies you will want to confirm that you are able to run these.

To confirm that they all work, run the following bash script in your terminal:

```terminal
./start
```

This will start all 3 of these apps in watch mode in your terminal. You can cancel the watch mode with `Ctrl+C` when you are ready to stop them. Make sure that these all run without errors.

Then open up a browser and navigate to all applications:

| App                 | Address                                                          |
| ------------------- | ---------------------------------------------------------------- |
| Reporting App       | http://localhost:4202                                            |
| Customer Portal App | http://localhost:4203                                            |
| Tuskdesk API        | http://localhost:3333/api/tickets/1 (should see a JSON response) |

Confirm that these apps render in the browser and that there are no console errors in the dev tools. Note that these apps have UI that is not interactive at some parts. Those are the parts we will build out in the workshop!

When you are done confirming that these apps run you can stop those watch runs by using `CTRL+C` in the terminal window.

### Additional installs

The workshop covers NgRx, which has a way to hook into Redux dev tools for browsers. While not a requirement for the workshop, the Redux dev tools are most likely going to
be something you will want to have as you write NgRx code going forward. Instructions
for installing the Redux Dev Tools can be found at:

> https://github.com/zalmoxisus/redux-devtools-extension

### Questions/Issues

If you run into any challenges please let us know prior to the workshop so we can work to assist in solving those challenges: workshops@nrwl.io
