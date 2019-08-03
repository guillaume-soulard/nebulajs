const beautify = require('json-beautify');
const Generator = require('../Generator');

exports.InstantGeneration = {
    generate: (config) => {
        let context = {};

        for (let itemNumber = 1; itemNumber <= config.options.amount; itemNumber++) {
            let object = Generator.parseTemplate(config.template, context, 'root');
            console.log(beautify(object, null, 2, 1));
        }
    }
};