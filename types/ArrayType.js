const Generator = require('../Generator');

exports.ArrayType = {
    options: {
        bounds: {
            min: 0,
            max: 10
        },
        itemTemplate: null
    },
    generate: (context) => {
        if (context.options.itemTemplate == null || context.options.itemTemplate === undefined) {
            throw new Error('itemTemplate must be defined');
        }

        let numberOfItemsToGenerate = parseInt((Math.random() * (context.options.bounds.max - context.options.bounds.min) + context.options.bounds.min)
            .toFixed(0));

        let array = [];
        let currentPath = context.currentPath;
        let itemTemplate = context.options.itemTemplate;

        for (let i = 1; i <= numberOfItemsToGenerate; i++) {

            array.push(Generator.parseTemplate(itemTemplate, context, currentPath + '[]'));
        }

        return array;
    }
};