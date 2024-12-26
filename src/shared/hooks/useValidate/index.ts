import { useState, useCallback } from 'react';
import validationRules from './validationRules';

type TValidationRuleKey = keyof typeof validationRules;

type TValidationState = {
    value: string;
    error: string | null;
};

type TUseValidationHook = {
    value: string;
    error: string | null;
    setValue: (value: string) => void;
    validate: () => boolean;
};

const useValidation = (
    initialValue: string = '',
    rules: TValidationRuleKey[] = [],
): TUseValidationHook => {
    const [state, setState] = useState<TValidationState>({
        value: initialValue,
        error: null,
    });

    const setValue = useCallback((value: string) => {
        setState((prevState) => ({ ...prevState, value }));
    }, []);

    const validate = useCallback(() => {
        for (const ruleKey of rules) {
            const rule = validationRules[ruleKey];
            if (!rule.rule(state.value)) {
                setState((prevState) => ({
                    ...prevState,
                    error: rule.errorMessage,
                }));
                return false;
            }
        }

        setState((prevState) => ({ ...prevState, error: null }));
        return true;
    }, [rules, state.value]);

    return {
        value: state.value,
        error: state.error,
        setValue,
        validate,
    };
};

export default useValidation;
