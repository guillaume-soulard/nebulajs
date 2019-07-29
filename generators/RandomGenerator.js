const extend = require('extend');
const AbstractGenerator = require('./AbstractGenerator').AbstractGenerator;

exports.RandomGenerator = extend(true, {}, AbstractGenerator, {
    next: (context) => {
        return (Math.random() * context.options.bounds.max) + context.options.bounds.min
    }
});