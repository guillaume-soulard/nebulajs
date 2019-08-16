const beautify = require('json-beautify');
const Generator = require('../Generator').Generator;

exports.InstantGeneration =  class InstantGeneration {
    static generate (config) {
        let context = {};
        let generator  = Generator.newInstance(config, context);

        for (let itemNumber = 1; itemNumber <= config.options.amount; itemNumber++) {
            let object = generator.generate(context);
            console.log(beautify(object, null, 2, 1));
        }
    }
};