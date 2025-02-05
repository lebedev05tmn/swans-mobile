type TValidationRule = {
    rule: (value: any) => boolean;
    errorMessage: string;
};

type TValidationRules = {
    [key: string]: TValidationRule;
};

const validationRules: TValidationRules = {
    require: {
        rule: (value) => value.trim().length > 0,
        errorMessage: 'Поле обязательно для заполнения',
    },
    letters: {
        rule: (value) => /^[A-Za-zА-Яа-я\s]+$/.test(value),
        errorMessage: 'Вводить можно только буквы',
    },
};

const useValidateField = (value: string, rules: string[] | undefined) => {
    if (!rules) return '';

    for (const ruleKey of rules) {
        const rule = validationRules[ruleKey];

        if (rule && !rule.rule(value)) {
            return rule.errorMessage;
        }
    }

    return '';
};

export default useValidateField;
