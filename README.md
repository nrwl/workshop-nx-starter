# TuskDesk Suite

This is the demo project for a workshop on using [Nrwl Nx](https://nx.dev). It is a suite of apps for a help desk type of solution. There is an application for users to view their tickets and one for reporting. There is also a legacy AngularJS application for agents to manage tickets.

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
Please run the following script to make sure your environment is functional.

```shell
./start
```

This script is a short-hand version of:

```shell
npm run serve-all
```

Which will serve the following apps in parallel in a single shell:
* api: NestJs server for REST API 
* customer-portal: Angular SPA for tickets
* reporting: Angular SPA for admin dashboard
