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

    static newInstance (config, context) {

        return new Generator(this.parseTemplate(config.template,
            this.getAliasStrategy(config),
            context));
    }
    static getAliasStrategy(config) {
        let aliasStrategy = {};

        if (config.options !== undefined && config.options.alias !== undefined) {

            for (let aliasName in config.options.alias) {
                let alias = config.options.alias[aliasName];

                if (alias.template === undefined) {
                    throw new Error('Alias at index ' + aliasIndex + ' missing property template');
                }

                aliasStrategy[aliasName] = alias.template;
            }
        }

        return aliasStrategy;
    }

    static parseTemplate (template, aliasStrategy, context) {
        let executableTemplate = {};

        if (template instanceof Object) {

            if (this.isAlias(template, aliasStrategy)) {
                template = this.getAlias(template, aliasStrategy);
            }

            if (this.isType(template)) {

                executableTemplate = Generator.getTypeGenerator(template);
            } else {

                for (let propertyName in template) {

                    executableTemplate[propertyName] = Generator.parseTemplate(template[propertyName], aliasStrategy, context);
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

        return this.hasTypeProperty(template) && typeStrategy[template._type] !== undefined;
    }

    static isAlias(template, aliasStrategy) {

        return this.hasTypeProperty(template) && aliasStrategy[template._type] !== undefined;
    }

    static getAlias(template, aliasStrategy) {

        return aliasStrategy[template._type];
    }

    static hasTypeProperty(template) {

        return template.hasOwnProperty("_type")
    }

    static getTypeName(template) {

        if (template.hasOwnProperty("_type")) {
            return template._type;
        }

        throw new Error('Unable to determine the type');
    }
};