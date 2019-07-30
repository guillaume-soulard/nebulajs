const extend = require('extend');
const AbstractType = require('./AbstractType').AbstractType;

exports.DateType = extend(true, {}, AbstractType, {
    options: {
        bounds: {
            min: 0,
            max: Number.MAX_VALUE
        }
    },
    generate: (context) => {
        return new Date(parseInt((Math.random() * (context.options.bounds.max - context.options.bounds.min) + context.options.bounds.min)
            .toFixed(0)));
    }
});