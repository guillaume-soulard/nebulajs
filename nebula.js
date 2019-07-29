const seedrandom = require('seedrandom');
const fs = require("fs");
const extend = require('extend');

const StringType = require('./types/StringType').StringType;
const NumberType = require('./types/NumberType').NumberType;

const typeStrategy = {
  string: StringType,
  number: NumberType
};

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

    console.log(parseTemplate(fileConfig.template));
}

function applyGlobalOptions(options) {
    if (options.seed != null) {
        seedrandom(options.seed, {global: true});
    }
}

function parseTemplate(template) {

    let object = {};

    if (template instanceof Object) {
        if (isType(template)) {
            let type = extend(true, {}, typeStrategy[getTypeName(template)]);
            if (template.options !== undefined) {
                type.options = extend(true, type.options, template.options);
            }
            object = type.generate({
                options: type.options
            });
        } else {
            for (let propertyName in template) {
                object[propertyName] = parseTemplate(template[propertyName]);
            }
        }
    } else {
        object = template;
    }

    return object;
}

function isType(template) {

    for (let propertyName in template) {
        if (propertyName === '_type') {
            return true;
        }
    }

    return false;
}

function getTypeName(template) {

    for (let propertyName in template) {
        if (propertyName === '_type') {
            return template[propertyName];
        }
    }

    throw new Error('Unable to determine the type');
}