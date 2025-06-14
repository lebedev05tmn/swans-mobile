import { View, Text, Pressable } from 'react-native';
import styles from './style';
import { FC } from 'react';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import data from '@/data.json';
import NextButton from '@/src/components/create-profile/NextButton';
import Input from '@/src/shared/ui/Input';

import ChooseInterests from '@/src/components/create-profile/ChooseInterests';
import DateInput from '../DateInput';
import SexInput from '../SexInput';
import ImagesInput from '../ImagesInput';

type TContentComponent = {
    id: string;
    title: string;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    description?: string;
    input: {
        type: string;
        placeholder?: string;
        onChangeText?: string;
        value?: string;
        options?: string[];
    };
    skipButton?: boolean;
    nextButton: boolean;
    validationRules?: string[];
};

const Slide: FC<TContentComponent> = ({
    id,
    title,
    description,
    input,
    nextButton,
    skipButton,
    textAlign,
}) => {
    const errorMessage = useCreateProfileStore((state) => state.errorMessage);
    const form = useCreateProfileStore((state) => state.form);
    const {
        actions: { next, setDescription, setCity, setUserName, setSex },
    } = useCreateProfileStore();

    const getValue = () => {
        switch (id) {
            case 'name':
                return form.user_name;
            case 'city':
                return form.city;
            case 'description':
                return form.description;
            case 'birth_date':
                return form.birth_date;
            case 'sex':
                return form.sex;
            default:
                return '';
        }
    };

    const handleChange = (value: string) => {
        switch (id) {
            case 'name':
                return setUserName(value);
            case 'city':
                return setCity(value);
            case 'description':
                return setDescription(value);
            case 'sex':
                return setSex(value);
        }
    };

    const renderInput = () => {
        switch (input.type) {
            case 'string':
                return (
                    <Input
                        placeholder={input.placeholder}
                        value={getValue()}
                        onChangeText={handleChange}
                    />
                );
            case 'longString':
                return (
                    <Input
                        placeholder={input.placeholder}
                        viewStyle={{
                            paddingVertical: 8,
                            height: 96,
                        }}
                        textAlignVertical={'top'}
                        value={getValue()}
                        onChangeText={handleChange}
                        multiline={true}
                    />
                );
            case 'date':
                return <DateInput />;
            case 'select':
                return <SexInput />;
            case 'images':
                return <ImagesInput />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, textAlign && { textAlign }]}>
                {title}
            </Text>
            {description && (
                <Text style={styles.description}>{description}</Text>
            )}

            {renderInput()}

            {
                <View style={styles.textWrap}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            }

            {nextButton && <NextButton />}

            {skipButton && (
                <Pressable onPress={next}>
                    <Text style={styles.skipButtonText}>Пропустить</Text>
                </Pressable>
            )}
        </View>
    );
};

const dataCreateProfileContent: TContentComponent[] = JSON.parse(
    JSON.stringify(data),
);

const createProfileBodyComponents = [
    ...dataCreateProfileContent.map((item) => (
        <Slide key={item.id} {...item} />
    )),
    <ChooseInterests key="interests" />,
];

export default createProfileBodyComponents;
