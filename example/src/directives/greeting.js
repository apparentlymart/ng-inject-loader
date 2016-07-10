
var greetingBuilder = ngRequire('greetingBuilder');

module.exports = {
    restrict: 'E',
    template: '<h1>{{ greetingText }}</h1>',
    scope: {
        name: '@name'
    },
    controller: ['$scope', function ($scope) {
        $scope.$watch('name', function (newName) {
            $scope.greetingText = greetingBuilder.makeGreeting(newName);
        });
    }],
};
