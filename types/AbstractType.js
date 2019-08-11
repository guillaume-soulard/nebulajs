const extend = require('extend');

exports.AbstractType = class AbstractType {
    constructor(options, typeContext) {
        this.options = options;
        this.typeContext = typeContext;
        this.__GEN_TYPE__ = true;
    }

    static buildObtions (defaultOptions, options) {
        return extend({}, defaultOptions, options);
    }

    generate (context) {
        throw new Error('Specific type not defined');
    }
    newInstance(options) {
        throw new Error('Specific type not defined');
    }
};