const fs = require("fs");
const extend = require('extend');
const program = require('commander');
const InstantGeneration = require('./generations/InstantGeneration').InstantGeneration;
const IntervalGeneration = require('./generations/IntervalGeneration').IntervalGeneration;
const defaultAlias = require('./DefaultALias').alias;

const defaultGlobalOptions = {
    seed: null,
    amount: 1,
    skip: 0,
    generation: {
        type: "instant"
    },
    alias: defaultAlias
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

    if (fileConfig.options.generation.type === 'instant') {
        new InstantGeneration(fileConfig).generate();
    } else if (fileConfig.options.generation.type === 'interval') {
        new IntervalGeneration(fileConfig).generate();
    }
}