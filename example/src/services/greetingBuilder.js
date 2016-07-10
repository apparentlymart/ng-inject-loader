
// This is a very contrived example of a service provider just to illustrate
// how one might be written using ng-inject-loader. In a real application we
// would of course just put the interpolation string in the directive template
// where it belongs.

// ngRequire returns a service from the Angular injector.
var $interpolate = ngRequire('$interpolate');

// We can still do normal 'require' in here to call in to
// standard (non-Angular-related) CommonJS modules.
var config = require('../config.js');

var makeGreeting = $interpolate(config.greetingTemplate);

module.exports = {

    makeGreeting: function (name) {
        return makeGreeting({name: name});
    },

};
