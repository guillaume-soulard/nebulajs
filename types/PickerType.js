const { AbstractType } = require('./AbstractType');

exports.PickerType = class PickerType extends AbstractType {

    constructor(options, typeContext) {
        super(options, typeContext)
    }

    static newInstance(options) {

        let finalOptions = AbstractType.buildObtions({
            items: null
        }, options);

        if (finalOptions.items == null) {
            throw new Error('items option must be defined');
        }

        let typeContext = {
            isProbabilistic: false,
            items: []
        };

        if (PickerType.isCorrectProbabilisticItems(finalOptions.items)) {

            let offset = 0;
            typeContext.isProbabilistic = true;

            for (let i = 0; i < finalOptions.items.length; i++) {
                typeContext.items.push({
                    value: finalOptions.items[i].value,
                    min: offset,
                    max: finalOptions.items[i].probability + offset
                });

                offset += finalOptions.items[i].probability;
            }
        } else {
            typeContext.items = finalOptions.items;
        }

        return new PickerType(finalOptions, typeContext);
    }

    generate(context) {

        if (this.typeContext.isProbabilistic) {

            let object;
            let random = parseFloat((Math.random() * (100 - 1)));

            for (let i = 0; i < this.typeContext.items.length; i++) {
                if (this.typeContext.items[i].min <= random && this.typeContext.items[i].max > random) {
                    object = this.typeContext.items[i].value;
                    break;
                }
            }

            return object;

        } else {
            let index = parseInt((Math.random() * (this.typeContext.items.length - 1))
                .toFixed(0));

            return this.typeContext.items[index];
        }

    }

    static isCorrectProbabilisticItems(items) {

        let probabilisticItemsCount = 0;
        let nonProbabilisticItemsCount = 0;
        let probabilitySum = 0;

        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            if (items[itemIndex].value !== undefined && items[itemIndex].probability !== undefined) {
                probabilisticItemsCount++;
                probabilitySum += items[itemIndex].probability;
            } else {
                nonProbabilisticItemsCount++;
            }
        }

        if (probabilisticItemsCount > 0 && nonProbabilisticItemsCount > 0) {
            throw new Error('Probabilistic items structure is incorrect');
        }

        if (probabilisticItemsCount > 0 && nonProbabilisticItemsCount === 0 && probabilitySum !== 100) {
            throw new Error('Probability sum is not equals to 100');
        }

        return probabilisticItemsCount > 0;
    }
}