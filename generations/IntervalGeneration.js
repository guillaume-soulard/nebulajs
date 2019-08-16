const beautify = require('json-beautify');
const AbstractGeneration = require('./AbstractGeneration').AbstractGeneration;

const defaultOptions = {
    interval: 1000
};

exports.IntervalGeneration = class IntervalGeneration extends AbstractGeneration {

    constructor(config) {
        super(config);
    }

    generate () {
        let interval = defaultOptions.interval;

        if (this.config.options.generation.options.interval) {
            interval = this.config.options.generation.options.interval;
        }

        for (let itemIndex = this.config.options.skip; itemIndex < (this.config.options.skip + this.config.options.amount); itemIndex++) {
            console.log(beautify(this.generateObjectAt(itemIndex), null, 2, 1));
            this.sleep(interval);
        }
    }

    sleep(miliseconds) {
        let currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }
};