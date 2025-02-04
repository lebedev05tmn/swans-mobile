import LongDescriptionInput from '@/src/components/createProfile/longDescriptionInput';
import SexInput from '@/src/components/createProfile/sexInput';
import DateInput from '@/src/components/createProfile/dateInput';
import NameInput from '@/src/components/createProfile/nameInput';
import CityInput from '@/src/components/createProfile/cityInput';
import ImageSlider from '@/src/components/createProfile/imageSlider';

const enum rules {
    require = 'require',
    letters = 'letters',
}

export type TContentComponent = {
    title: string;
    description?: string;
    input: JSX.Element;
    countinueButton: boolean;
    validationRules?: string[];
};

const dataCreateProfileContent: TContentComponent[] = [
    {
        title: 'Привет, давай знакомиться',
        description: 'Будь собой при выборе имени, привлекает больше внимания.',
        input: <NameInput />,
        countinueButton: true,
        validationRules: [rules.require, rules.letters],
    },
    {
        title: 'Где живем, там и ищем',
        description: 'Выбери свой город, чтобы найти ближайщих соулмейтов',
        input: <CityInput />,
        countinueButton: true,
        validationRules: [rules.require],
    },
    {
        title: 'Выбери дату рождения',
        description: 'Используй настояющую, ее потом поменять нельзя',
        input: <DateInput />,
        countinueButton: true,
        validationRules: [rules.require],
    },
    {
        title: 'Стань солцем среди планет',
        description: 'Сделай свой \"слоган\", который выделит тебя среди всех',
        input: <LongDescriptionInput />,
        countinueButton: true,
    },
    {
        title: 'Последний этап регистрации',
        description: 'Выберите пол',
        input: <SexInput />,
        countinueButton: false,
    },
    {
        title: 'Загрузите фото',
        input: <ImageSlider />,
        countinueButton: true,
        validationRules: [rules.require],
    },
];

export default dataCreateProfileContent;
