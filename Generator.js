const extend = require('extend');

const StringType = require('./types/StringType').StringType;
const NumberType = require('./types/NumberType').NumberType;
const DateType = require('./types/DateType').DateType;
const ArrayType = require('./types/ArrayType').ArrayType;
const PickerType = require('./types/PickerType').PickerType;

const typeStrategy = {
    string: StringType,
    number: NumberType,
    date: DateType,
    array: ArrayType,
    picker: PickerType
};

exports.parseTemplate = parseTemplate;

function parseTemplate(template, context, path) {

    let object = {};

    if (template instanceof Object) {
        if (isType(template)) {

            let type = getTypeGenerator(template);
            if (!context.hasOwnProperty(path)) {
                context[path] = {};
            }
            context.currentPath = path;
            context.options = type.options;
            object = type.generate(context);
        } else {
            for (let propertyName in template) {
                object[propertyName] = parseTemplate(template[propertyName], context, path + '.' + propertyName);
            }
        }
    } else {
        object = template;
    }

    return object;
}

function getTypeGenerator(template) {
    let type = extend(true, {}, typeStrategy[getTypeName(template)]);
    if (template.options !== undefined) {
        type.options = extend(true, type.options, template.options);
    }

    return type;
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