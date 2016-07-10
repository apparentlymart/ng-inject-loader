var angular = require('angular');
var app = require('./app.js');

angular.element(document).ready(function () {
    angular.bootstrap(document, [app]);
});
