const { AbstractType } = require('./AbstractType');

exports.ArrayType = class ArrayType extends AbstractType {

    static newInstance(options, Generator) {

        let finalOptions = AbstractType.buildObtions({
            bounds: {
                min: 0,
                max: 10
            },
            itemTemplate: null
        }, options);

        if (finalOptions.itemTemplate == null || finalOptions.itemTemplate === undefined) {
            throw new Error('itemTemplate must be defined');
        }

        return new ArrayType(finalOptions, {
            generator: Generator.newInstance({ template: finalOptions.itemTemplate }, {})
        });
    }

    generate (context) {

        let numberOfItemsToGenerate = parseInt((Math.random() * (this.options.bounds.max - this.options.bounds.min) + this.options.bounds.min)
            .toFixed(0));

        let array = [];

        for (let i = 1; i <= numberOfItemsToGenerate; i++) {

            array.push(this.typeContext.generator.generate(context));
        }

        return array;
    }
};