# ng-inject-loader

A webpack loader that allows you to define AngularJS services, directives and other resources using
CommonJS syntax.

AngularJS has its own module system that feels somewhat alien in a CommonJS
environment, with AngularJS modules and services existing in an entirely separate universe
than CommonJS modules, and using a parameter dependency injection syntax that is particularly
unusual when compared to other module systems.

This loader wraps CommonJS modules to allow them to be used as factories for AngularJS services,
directives, and other resources that are defined via injectable factory functions. It also
provides a new, `require`-inspired syntax for accessing other services.

For example, here is a CommonJS module for a service factory, which we'll assume is at `services/apiClient.js`:

```js
var $http = ngRequire('$http'); // Obtain the $http service from the injector

// The exported value is what will be returned when this service is requested from
// the injector by another module.
module.exports = {
    getUser: function getUser(userId) {
        return $http.get('https://example.net/users/' + encodeURIComponent(userId)).then(
            function (response) {
                return response.data;
            }
        );
    },
};
```

We can then register it in an AngularJS module through `ng-inject-loader`:

```js
someModule.factory('apiClient', require('ng-inject-loader!./services/apiClient.js'));
```

## How To Use It

Install the module from npm:

```
npm install --save-dev ng-inject-loader
```

After this, it can be used by prefixing `require` requests with `ng-inject-loader!`.

When `ng-inject-loader` loader is used, the evaluation of the target module is delayed and
instead a factory function is produced for it. This factory function can then be used
anywhere that AngularJS expects an injectable function. This includes many of the methods
of [`Module`](https://docs.angularjs.org/api/ng/type/angular.Module) used for registering
module resources.

For a complete (albeit contrived) example of using this module, in conjunction with a related module
[`ng-anon-module`](https://www.npmjs.com/package/ng-anon-module), see
[the `example` directory](https://github.com/apparentlymart/ng-inject-loader/tree/master/example).

### The `ngRequire` function

`ng-inject-loader` extends CommonJS by providing an additional function `ngRequire`, which
is similar to `require` but retrieves services from the AngularJS dependency injection:

```
var $q = ngRequire('$q');
```

Note that `ngRequire` is only able to retrieve services registered on the injector that
the function was registered with. In particular, it does not have access to "locals" that
are injected in certain cases, such as the `$scope` and `$element` values that are
injected into controllers that belong to directives. For these it remains necessary to
use the traditional AngularJS dependency injection syntax, possibly with the help
of [`ng-annotate-webpack-plugin`](https://www.npmjs.com/package/ng-annotate-webpack-plugin).

## Development

The usual npm workflow can be used to work with this codebase. Note that at the present time
it does not have any automated tests, but the module in the `example` directory can be used
to do manual acceptance testing.

## License

Copyright (c) 2016 Martin Atkins

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
