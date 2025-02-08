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
    age: {
        rule: (value) => {
            const birthDate = new Date(value);
            const today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            return age >= 18;
        },
        errorMessage: 'Минимальный возраст 18 лет',
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
