# MyAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `https://localhost:44478/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


This application works with a docker image containing the mysql database :
 docker run --name aspdotnet -e MYSQL_ROOT_PASSWORD=aspdotnet -e MYSQL_DATABASE=myangularapp -e MYSQL_USER=bart -e MYSQL_PASSWORD=bart -p 3306:3306 -d mysql:latest

Be careful : for Docker to work, you need to install Docker Desktop on Windows.
