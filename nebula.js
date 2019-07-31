const seedrandom = require('seedrandom');
const fs = require("fs");
const extend = require('extend');
const Generator = require('./Generator');
const program = require('commander');

const defaultGlobalOptions = {
    seed: null,
    amount: 10
};

program.version("1.0.0")
    .arguments('<file>')
    .description('Data generation from description file')
    .action(function(file){
        fs.readFile(file, 'utf8', loadFile);
    });

program.parse(process.argv);

if (process.argv.length !== 3) {
    program.outputHelp();
}

function loadFile(err, data) {
    let fileConfig = JSON.parse(data);
    if (fileConfig.template === undefined) {
        throw new Error('template must be specified');
    }

    if (fileConfig.options !== undefined) {
        fileConfig.options = extend(true, {}, defaultGlobalOptions, fileConfig.options);
    } else {
        fileConfig.options = fileConfig.options = extend(true, {}, defaultGlobalOptions);
    }

    applyGlobalOptions(fileConfig.options);

    let context = {};

    for (let itemNumber = 1; itemNumber <= fileConfig.options.amount; itemNumber++) {
        console.log(Generator.parseTemplate(fileConfig.template, context, 'root'));
    }
}

function applyGlobalOptions(options) {
    if (options.seed != null) {
        seedrandom(options.seed, {global: true});
    }
}