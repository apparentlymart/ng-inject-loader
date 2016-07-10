// Produces the function that wraps the given module source and
// makes it injectable.

// There are three different functions represented here:
// - ngInjectWrapper takes a function impl that expects the arguments
//   (modules, exports, ngRequire) and returns an AngularJS-injectable
//   function, called 'injectable'.
// - injectable is given the $injector from the Angular context it's
//   being injected into, and produces a suitable context to run impl.
// - impl is a generated wrapper around a CommonJS module, created from
//   within the loader itself. (in index.js)

module.exports = function ngInjectWrapper(impl) {
    var injectable = function ($injector) {
        var innerModule = {exports:{}};
        var context = this;
        function ngRequire(n) {
            return $injector.get(n);
        }
        impl.call(context, innerModule, innerModule.exports, ngRequire);
        return innerModule.exports;
    };
    injectable.$inject = ['$injector'];
    return injectable;
};
