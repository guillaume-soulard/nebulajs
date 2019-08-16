const beautify = require('json-beautify');
const AbstractGeneration = require('./AbstractGeneration').AbstractGeneration;

exports.InstantGeneration =  class InstantGeneration extends AbstractGeneration{

    constructor(config) {
        super(config);
    }

    generate () {
        for (let itemIndex = this.config.options.skip; itemIndex < (this.config.options.skip + this.config.options.amount); itemIndex++) {
            console.log(beautify(this.generateObjectAt(itemIndex), null, 2, 1));
        }
    }
};