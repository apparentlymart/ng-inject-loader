
var app = require('ng-anon-module')();

// ng-inject-loader! prefix causes these requires to return
// an injectable factory function, with the actual module code
// not evaluated until requested from the injector.
app.factory('greetingBuilder', require('ng-inject-loader!./services/greetingBuilder.js'));
app.directive('greeting', require('ng-inject-loader!./directives/greeting.js'));

module.exports = app;
