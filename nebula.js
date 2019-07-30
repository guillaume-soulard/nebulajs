const seedrandom = require('seedrandom');
const fs = require("fs");
const extend = require('extend');
const Generator = require('./Generator');

const defaultGlobalOptions = {
    seed: null
};

if (process.argv.length !== 3) {
    throw new Error('Usage');
}

fs.readFile(process.argv[2], 'utf8', loadFile);

function loadFile(err, data) {
    var fileConfig = JSON.parse(data);
    if (fileConfig.template === undefined) {
        throw new Error('template must be specified');
    }

    if (fileConfig.options !== undefined) {
        fileConfig.options = extend(true, {}, defaultGlobalOptions, fileConfig.options);
    } else {
        fileConfig.options = fileConfig.options = extend(true, {}, defaultGlobalOptions);
    }

    applyGlobalOptions(fileConfig.options);

    console.log(Generator.parseTemplate(fileConfig.template, {}, 'root'));
}

function applyGlobalOptions(options) {
    if (options.seed != null) {
        seedrandom(options.seed, {global: true});
    }
}