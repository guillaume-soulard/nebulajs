const RandomGenerator = require('../generators/RandomGenerator');
const extend = require('extend');

exports.AbstractType = {
    options: {
        generator: extend(true, {}, RandomGenerator)
    },
    generate: (context) => {
        throw new Error('Unimplemented')
    }
};