const RandExp = require('randexp');
const { AbstractType } = require('./AbstractType');

exports.StringType = class StringType extends AbstractType {

    static newInstance(options) {

        let finalOptions = AbstractType.buildObtions({
            pattern: '[A-Z]{1}[A-Za-z]{10,25}'
        }, options);

        return new StringType(finalOptions, {
            randExp: new RandExp(finalOptions.pattern, '')
        });
    }

    generate (context) {
        return this.typeContext.randExp.gen();
    }
};