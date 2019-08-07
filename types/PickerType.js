exports.PickerType = {
    options: {
        items: null
    },
    generate: (context) => {

        if (context.options.items == null) {
            throw new Error('items option must be defined');
        }

        if (isCorrectProbabilisticItems(context.options.items)) {

            let object;
            let items = [];
            let offset = 0;

            for (let i = 0; i < context.options.items.length; i++) {
                items.push({
                    value: context.options.items[i].value,
                    min: offset,
                    max: context.options.items[i].probability + offset
                });

                offset += context.options.items[i].probability;
            }

            let random = parseFloat((Math.random() * (100 - 1)));

            for (let i = 0; i < items.length; i++) {
                if (items[i].min <= random && items[i].max > random) {
                    object = items[i].value;
                    break;
                }
            }

            return object;
        } else {
            let index = parseInt((Math.random() * (context.options.items.length - 1))
                .toFixed(0));

            return context.options.items[index];
        }
    }
};

function isCorrectProbabilisticItems(items) {

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

    if (probabilitySum !== 100) {
        throw new Error('Probability sum is not equals to 100');
    }

    return probabilisticItemsCount > 0;
}