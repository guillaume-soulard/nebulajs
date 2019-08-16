const Generator = require('../Generator').Generator;
const seedrandom = require('seedrandom');

exports.AbstractGeneration =  class AbstractGeneration {

    constructor(config) {
        this.config = config;
        this.context = {};
        this.generator = Generator.newInstance(config, this.context);

        if (config.options.seed != null) {
            this.seed = this.hashSeed(config.options.seed);
        } else {
            this.seed = null;
        }
    }

    hashSeed(seed) {
        let hash = 0, i, chr;
        if (seed.length === 0) return hash;
        for (i = 0; i < seed.length; i++) {
            chr   = seed.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }

    generateObjectAt (index) {

        if (this.seed != null) {
            seedrandom(this.seed + index, { global: true });
        }

        this.context.index = index;

        return this.generator.generate(this.context);
    }
};