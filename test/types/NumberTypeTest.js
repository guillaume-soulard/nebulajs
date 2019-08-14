const assert = require('assert');
const NumberType = require('../../types/NumberType').NumberType;

describe('NumberType', () => {
    describe('#generate', () => {
        it('should return 1 when bound is 1:1', () => {
            let result = generateWithOptions({bounds:{
                    min: 1,
                    max: 1
                }});
            assert.equal(result, 1);
        });

        it('should return 5 when bound is 5:5', () => {
            let result = generateWithOptions({bounds:{
                    min: 5,
                    max: 5
                }});
            assert.equal(result, 5);
        });

        it('should return between 1 and 10 when bound is 1:10', () => {
            let result = generateWithOptions({bounds:{
                    min: 1,
                    max: 10
                }});
            assert(result >= 1 && result <= 10);
        });

        it('should return 0 when first call is performed', () => {
            let generator = getGenerator({sequence:{
                    enable: true
                }});
            let result = generator.generate();
            assert.equal(result, 0);
        });

        it('should return 1 when second call is performed', () => {
            let generator = getGenerator({sequence:{
                    enable: true
                }});
            generator.generate();
            let result = generator.generate();
            assert.equal(result, 1);
        });

        it('should throw error when sequence max is reach', () => {
            let generator = getGenerator({
                bounds: {
                  min: 0,
                  max: 0
                },
                sequence:{
                    enable: true
                }});
            generator.generate();
            assert.throws(generator.generate, Error);
        });
    });
});

function generateWithOptions(options) {
    return getGenerator(options).generate()
}

function getGenerator(options) {
    return NumberType.newInstance(options)
}