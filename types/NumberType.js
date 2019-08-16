const { AbstractType } = require('./AbstractType');

exports.NumberType = class NumberType extends AbstractType {

    static newInstance(options) {

        return new NumberType(AbstractType.buildObtions({
            bounds: {
                min: 0,
                max: 10
            },
            decimals: 0,
            sequence: {
                enable: false,
                cycle: true,
                increment: 1
            }
        }, options), { seq: null });
    }

    generate (context) {

        if (this.options.sequence.enable) {
            if (this.typeContext.seq == null || (this.typeContext.seq > this.options.bounds.max && this.options.sequence.cycle)) {
                this.typeContext.seq = this.options.bounds.min + context.index;
            }

            if (!this.options.sequence.cycle && this.typeContext.seq > this.options.bounds.max) {
                throw new Error('Sequence reach the maximum of ' + this.options.bounds.max + ' and cannot cycle. Use options.sequence.cycle: true to allow sequence cycle');
            }

            let numberToReturn = this.typeContext.seq;

            this.typeContext.seq += this.options.sequence.increment;

            return numberToReturn;
        } else {
            return parseFloat((Math.random() * (this.options.bounds.max - this.options.bounds.min) + this.options.bounds.min)
                .toFixed(this.options.decimals));
        }
    }
};