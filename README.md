# TuskDesk Suite

This is the demo project for a workshop on using [Nrwl Nx](https://nrwl.io/nx). It is a suite of apps for a help desk type of solution. There is an application for users to view their tickets and one for reporting. There is also a legacy AngularJS application for agents to manage tickets.

## Requirements

If you don't already have [Node](https://nodejs.org) installed, please install any stable version 6.9.0 or above.

Install the Angular CLI globally
```console
npm install -g @angular/cli
```
or
```console
yarn global add @angular/cli
```

If you don't already have it, install an up-to-date [Google Chrome browser](https://www.google.com/chrome/).

## Initial setup
cd into the local repo directory and run:
```console
npm install
```
or
```console
yarn
```

## Running the applications in the suite
Please run the following commands to make sure your environment is functional.

There is a server for the backend data that needs to be running for any of the front end apps to run. Please run this command in a separate terminal window:
```shell
npm run server
```
The front end (Angular) apps can be run with the following commands:
```shell
npm run reporting # serves app at localhost:4202
npm run customer-portal # serves app at localhost:4203
```
The front end (AngularJS) app can be run with the following command:
```shell
npm run legacy-agent-workdesk # serves app at localhost:8000
```
