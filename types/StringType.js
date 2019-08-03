const RandExp = require('randexp');

exports.StringType = {
    options: {
        pattern: '[A-Z]{1}[A-Za-z]{10,25}'
    },
    generate: (context) => {
        return new RandExp(context.options.pattern, '').gen();
    }
};