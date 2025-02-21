import LongDescriptionInput from '@/src/components/createProfile/longDescriptionInput';
import SexInput from '@/src/components/createProfile/sexInput';
import DateInput from '@/src/components/createProfile/dateInput';
import NameInput from '@/src/components/createProfile/nameInput';
import CityInput from '@/src/components/createProfile/cityInput';
import ImageSlider from '@/src/components/createProfile/imagesInput';
import { TextStyle } from 'react-native';

const enum rules {
    require = 'require',
    onlyLetters = 'onlyLetters',
    minLength = 'minLength',
    maxLength = 'maxLength',
    minAge = 'minAge',
    maxAge = 'maxAge',
    imageRequire = 'imageRequire',
    maxDescriptionLength = 'maxDescriptionLength',
}

export type TContentComponent = {
    id: string;
    title: string;
    textAlign?: TextStyle;
    description?: string;
    input: JSX.Element;
    skipButton?: boolean;
    countinueButton: boolean;
    validationRules?: string[];
};

const dataCreateProfileContent: TContentComponent[] = [
    {
        id: 'name',
        title: 'Привет, давай знакомиться',
        description: 'Будь собой при выборе имени, привлекает больше внимания.',
        input: <NameInput />,
        countinueButton: true,
        validationRules: [
            rules.require,
            rules.onlyLetters,
            rules.minLength,
            rules.maxLength,
        ],
    },
    {
        id: 'city',
        title: 'Где живем, там и ищем',
        description: 'Выбери свой город, чтобы найти ближайщих соулмейтов',
        input: <CityInput />,
        countinueButton: true,
        validationRules: [
            rules.require,
            rules.onlyLetters,
            rules.minLength,
            rules.maxLength,
        ],
    },
    {
        id: 'birth_date',
        title: 'Выбери дату рождения',
        description: 'Используй настояющую, ее потом поменять нельзя',
        input: <DateInput />,
        countinueButton: true,
        
    },
    {
        id: 'long_desc',
        title: 'Стань солцем среди планет',
        description: 'Сделай свой \"слоган\", который выделит тебя среди всех',
        input: <LongDescriptionInput />,
        countinueButton: true,
        validationRules: [rules.require, rules.maxDescriptionLength],
        skipButton: true,
    },
    {
        id: 'sex',
        title: 'Последний этап регистрации',
        description: 'Выберите пол',
        input: <SexInput />,
        countinueButton: false,
    },
    {
        id: 'images',
        title: 'Загрузите фото',
        input: <ImageSlider />,
        countinueButton: true,
        textAlign: { textAlign: 'center' },
        validationRules: [rules.imageRequire],
    },
];

export default dataCreateProfileContent;
