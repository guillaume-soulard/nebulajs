const { AbstractType } = require('./AbstractType');
const truncateList = {
    "milliseconds": 0,
    "seconds": 1,
    "minutes": 2,
    "hours": 3,
    "days": 4,
    "months": 5,
    "years": 6
};

exports.DateType = class DateType extends AbstractType {

    static newInstance(options) {

        return new DateType(AbstractType.buildObtions({
            bounds: {
                min: 0,
                max: 4102444800000
            },
            truncate: "milliseconds"
        }, options), { });
    }

    generate (context) {

        let minTimestamp, maxTimestamp;

        if (!isNaN(this.options.bounds.min)) {

            minTimestamp = this.options.bounds.min
        } else {

            minTimestamp = new Date(this.options.bounds.min).getTime();
        }

        if (!isNaN(this.options.bounds.max)) {

            maxTimestamp = this.options.bounds.max
        } else {

            maxTimestamp = new Date(this.options.bounds.max).getTime();
        }

        return this.truncateDate(new Date(parseInt((Math.random() * (maxTimestamp - minTimestamp) + minTimestamp)
            .toFixed(0))), this.options.truncate);
    }

    truncateDate(date, truncate) {

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
};