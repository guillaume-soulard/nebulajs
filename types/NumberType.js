const extend = require('extend');
const AbstractType = require('./AbstractType').AbstractType;

exports.NumberType = extend(true, {}, AbstractType, {
    options: {
        bounds: {
            min: 0,
            max: 10
        },
        decimals: 0,
        sequence: {
            enable: false,
            cycle: true
        }
    },
    generate: (context) => {

        if (context.options.sequence.enable) {
            if (context[context.currentPath].seq === undefined || (context[context.currentPath].seq > context.options.bounds.max && context.options.sequence.cycle)) {
                context[context.currentPath].seq = context.options.bounds.min;
            }

            let numberToReturn = context[context.currentPath].seq;

            context[context.currentPath].seq++;

            return numberToReturn;
        } else {
            return parseFloat((Math.random() * (context.options.bounds.max - context.options.bounds.min) + context.options.bounds.min)
                .toFixed(context.options.decimals));
        }
    }
});