exports.alias = {
    "bool": {
        template:
            {
                _type: "picker",
                options:
                    {
                        items: [true, false]
                    }
            }
    }
    ,
    "sequence-id": {
        template:
            {
                _type: "number",
                options:
                    {
                        bounds: {
                            min: 1,
                            max:
                                1.7976931348623157e+308
                        }
                        ,
                        sequence: {
                            enable: true,
                            cycle:
                                false,
                            increment:
                                1
                        }
                    }
            }
    }
    ,
    "email": {
        template:
            {
                _type: "string",
                options:
                    {
                        pattern: "[a-z]{7,15}(\\.[a-z]{7,15})?\\@[a-z]{7,15}\\.com"
                    }
            }
    }
};