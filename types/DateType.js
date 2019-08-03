const extend = require('extend');
const AbstractType = require('./AbstractType').AbstractType;

const truncateList = {
    "milliseconds": 0,
    "seconds": 1,
    "minutes": 2,
    "hours": 3,
    "days": 4,
    "months": 5,
    "years": 6
};

exports.DateType = extend(true, {}, AbstractType, {
    options: {
        bounds: {
            min: 0,
            max: Number.MAX_VALUE
        },
        truncate: "milliseconds"
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

        return truncateDate(new Date(parseInt((Math.random() * (maxTimestamp - minTimestamp) + minTimestamp)
            .toFixed(0))), context.options.truncate);
    }
});

function truncateDate(date, truncate) {

    let truncatePart = truncateList[truncate];

    if (truncatePart >= 6) {
        date.setUTCMonth(0);
    }

    if (truncatePart >= 5) {
        date.setUTCDate(1);
    }

    if (truncatePart >= 4) {
        date.setUTCHours(0);
    }

    if (truncatePart >= 3) {
        date.setUTCMinutes(0);
    }

    if (truncatePart >= 2) {
        date.setUTCSeconds(0);
    }

    if (truncatePart >= 1) {
        date.setUTCMilliseconds(0);
    }

    return date;
}