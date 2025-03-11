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
    imageRequire: {
        rule: (value) => value > 0,
        errorMessage: 'Загрузите хотя бы одну фотографию',
    },
    onlyLetters: {
        rule: (value) => /^[A-Za-zА-Яа-яЁё\s-]+$/.test(value),
        errorMessage: 'Допустимы только буквы, пробел и дефис',
    },
    minLength: {
        rule: (value) => value.length >= 2,
        errorMessage: 'Минимальная длина 2 символа',
    },
    maxLength: {
        rule: (value) => value.length <= 50,
        errorMessage: 'Максимальная длина 50 символов',
    },
    maxDescriptionLength: {
        rule: (value) => value.length <= 120,
        errorMessage: 'Максимальная длина 120 символов',
    },
    minAge: {
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
    maxAge: {
        rule: (value) => {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            return age <= 100;
        },
        errorMessage: 'Максимальный возраст 100 лет',
    }
};

const useValidateField = (value: string | number | undefined, rules: string[] | undefined) => {
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
