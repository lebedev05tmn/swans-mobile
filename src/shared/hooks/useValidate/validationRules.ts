type TValidationRule = {
    rule: (value: string) => boolean;
    errorMessage: string;
};

type TValidationRules = {
    [key: string]: TValidationRule;
};

const validationRules: TValidationRules = {
    require: {
        rule: (value) => value.length > 0,
        errorMessage: 'Поле обязательно для заполнения',
    },
    letters: {
        rule: (value) => /^[A-Za-zА-Яа-я\s]+$/.test(value),
        errorMessage: 'Вводить можно только буквы',
    },
};

export default validationRules;
