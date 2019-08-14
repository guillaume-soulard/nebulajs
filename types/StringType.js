const RandExp = require('randexp');
const { AbstractType } = require('./AbstractType');

exports.StringType = class StringType extends AbstractType {

    static newInstance(options) {

        let finalOptions = AbstractType.buildObtions({
            pattern: '[A-Z]{1}[A-Za-z]{10,25}'
        }, options);

        if (finalOptions.pattern == null) {
            throw new Error('pattern must be not null');
        }

        return new StringType(finalOptions, {
            randExp: new RandExp(finalOptions.pattern, '')
        });
    }

    generate (context) {
        return this.typeContext.randExp.gen();
    }
};