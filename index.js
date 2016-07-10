var path = require('path');
var SourceNode = require('source-map').SourceNode;
var utils = require('loader-utils');

var wrapperPath = 'ng-inject-loader/wrapper.js';

module.exports = function ngInject(src, origSourceMap) {
    this.cacheable();

    var sourceFn = this.resourcePath;

    var node = new SourceNode();
    node.add('module.exports = require(' + utils.stringifyRequest(this, wrapperPath) + ')(');
    node.add('function (module, exports, ngRequire) {\n');
    if (origSourceMap) {
        node.add(SourceNode.fromStringWithSourceMap(src, origSourceMap));
    }
    else {
        node.add(new SourceNode(1, 1, sourceFn, src));
    }
    node.add('\n});\n');

    var result = node.toStringWithSourceMap();

    this.callback(null, result.code, result.map.toJSON());
};
