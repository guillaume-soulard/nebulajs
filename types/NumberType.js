const extend = require('extend');
const AbstractType = require('./AbstractType').AbstractType;

exports.NumberType = extend(true, {}, AbstractType, {
    options: {
        bounds: {
            min: 0,
            max: 100
        },
        decimals: 0
},
    generate: (context) => {
        return parseFloat((Math.random() * (context.options.bounds.max - context.options.bounds.min) + context.options.bounds.min)
            .toFixed(context.options.decimals));
    }
});