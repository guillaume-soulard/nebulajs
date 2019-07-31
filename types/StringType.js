const extend = require('extend');
const AbstractType = require('./AbstractType').AbstractType;
const RandExp = require('randexp');

exports.StringType = extend(true, {}, AbstractType, {
    options: {
        pattern: '[A-Z]{1}[A-Za-z]{10,25}'
    },
    generate: (context) => {
        return new RandExp(context.options.pattern, '').gen();
    }
});