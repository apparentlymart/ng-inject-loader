# ng-inject-loader example

This is a minimal and very contrived example application for [`ng-inject-loader`](https://www.npmjs.com/package/ng-inject-loader),
which provides an alternative CommonJS-flavored syntax for implementing AngularJS services and directives.

This example also uses [`ng-anon-module`](https://www.npmjs.com/package/ng-anon-module), which is a separate but related
package that aims to align AngularJS modules with CommonJS modules, bypassing the global AngularJS module registry.

The most interesting parts are:

* [`src/main.js`](https://github.com/apparentlymart/ng-inject-loader/blob/master/example/src/main.js) is the application's entry point, which obtains the application module and bootstraps
  AngularJS with it.
* [`src/app.js`](https://github.com/apparentlymart/ng-inject-loader/blob/master/example/src/app.js) is the application's module, which is created as an anonymous module. It uses `ng-inject-loader`
  to create factory functions for the application's service and directive.
* [`src/services/greetingBuilder.js`](https://github.com/apparentlymart/ng-inject-loader/blob/master/example/src/services/greetingBuilder.js) is an incredibly contrived example of an AngularJS service
  defined as a CommonJS module.

This directory is itself an NPM package, so the example can be run in the usual way:

* `npm install`
* `npm start`
* Load [`http://127.0.0.1:8080/`](http://127.0.0.1:8080/) in your browser.

