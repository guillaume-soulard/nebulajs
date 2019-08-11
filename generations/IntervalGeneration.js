const beautify = require('json-beautify');

const defaultOptions = {
    interval: 1000
};

exports.IntervalGeneration = class {
    static generate (config, generator) {
        let interval = defaultOptions.interval;

        if (config.options.generation.options.interval) {
            interval = config.options.generation.options.interval;
        }

        let context = {};

        for (let itemNumber = 1; itemNumber <= config.options.amount; itemNumber++) {
            let object = Generator.parseTemplate(config.template, context, 'root');
            console.log(beautify(object, null, 2, 1));
            sleep(interval);
        }
    }

    static sleep(miliseconds) {
        let currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }
};