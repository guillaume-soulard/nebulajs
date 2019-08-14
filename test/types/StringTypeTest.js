const assert = require('assert');
const StringType = require('../../types/StringType').StringType;

describe('NumberType', () => {
    describe('#generate', () => {
        it('should return non empty', () => {
            let result = generateWithOptions({});
            assert(result.length > 0);
        });
    });

    describe('#newInstance', () => {
        it('should throw error when pattern is null', () => {
            assert.throws(() => getGenerator({pattern: null}), Error);
        });
    });
});

function generateWithOptions(options) {
    return getGenerator(options).generate()
}

function getGenerator(options) {
    return StringType.newInstance(options)
}