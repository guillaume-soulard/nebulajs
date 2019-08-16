const beautify = require('json-beautify');
const Generator = require('../Generator').Generator;

const defaultOptions = {
    interval: 1000
};

exports.IntervalGeneration = class IntervalGeneration {
    static generate (config) {
        let interval = defaultOptions.interval;

        if (config.options.generation.options.interval) {
            interval = config.options.generation.options.interval;
        }

        let context = {};
        let generator  = Generator.newInstance(config, context);

        for (let itemNumber = 1; itemNumber <= config.options.amount; itemNumber++) {
            let object = generator.generate(context);
            console.log(beautify(object, null, 2, 1));
            IntervalGeneration.sleep(interval);
        }
    }

    static sleep(miliseconds) {
        let currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }
};