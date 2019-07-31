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

        let minTimestamp, maxTimestamp;

        if (!isNaN(context.options.bounds.min)) {

            minTimestamp = context.options.bounds.min
        } else {

            minTimestamp = new Date(context.options.bounds.min).getTime();
        }

        if (!isNaN(context.options.bounds.max)) {

            maxTimestamp = context.options.bounds.max
        } else {

            maxTimestamp = new Date(context.options.bounds.max).getTime();
        }

        return new Date(parseInt((Math.random() * (maxTimestamp - minTimestamp) + minTimestamp)
            .toFixed(0)));
    }
});