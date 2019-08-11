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

exports.Generator = class Generator {

    constructor(executableTemplate) {
        this.executableTemplate = executableTemplate;
    }

    static newInstance (template, context) {

        return new Generator(Generator.parseTemplate(template, context));
    }

    static parseTemplate (template, context) {
        let executableTemplate = {};

        if (template instanceof Object) {

            if (Generator.isType(template)) {

                executableTemplate = Generator.getTypeGenerator(template);
            } else {

                for (let propertyName in template) {

                    executableTemplate[propertyName] = Generator.parseTemplate(template[propertyName], context);
                }
            }
        } else {
            executableTemplate = template;
        }

        return executableTemplate;
    }

    generate (context) {
        return this.generateObject(this.executableTemplate, context);
    }

    generateObject (executableTemplate, context) {

        let object = {};

        if (executableTemplate instanceof Object) {

            if (executableTemplate != null && executableTemplate.hasOwnProperty('__GEN_TYPE__')) {

                object = executableTemplate.generate(context);
            } else {

                for (let key in executableTemplate) {

                    object[key] = this.generateObject(executableTemplate[key], context);
                }
            }
        } else {

            object = executableTemplate;
        }

        return object;
    }

    static getTypeGenerator(template) {
        let type = typeStrategy[Generator.getTypeName(template)];
        let options = {};
        if (template.options !== undefined) {
            options = template.options;
        }

        return type.newInstance(options, Generator);
    }

    static isType(template) {

        return template.hasOwnProperty("_type")
    }

    static getTypeName(template) {

        if (template.hasOwnProperty("_type")) {
            return template._type;
        }

        throw new Error('Unable to determine the type');
    }
};