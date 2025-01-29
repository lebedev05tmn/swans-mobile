import AboutTextInput from '@/src/components/createProfile/aboutTextInput';
import ButtonChoice from '@/src/components/createProfile/choiceButton';
import DateInput from '@/src/components/createProfile/dateInput';
import NameInput from '@/src/components/createProfile/nameInput';
import PlaceInput from '@/src/components/createProfile/placeInput';

const enum rules {
    require = 'require',
    letters = 'letters',
}

export type TContentComponent = {
    title: string;
    description: string;
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
        input: <PlaceInput />,
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
        input: <AboutTextInput />,
        countinueButton: true,
    },
    {
        title: 'Последний этап регистрации',
        description: 'Выберите пол',
        input: <ButtonChoice />,
        countinueButton: false,
    },
];

export default dataCreateProfileContent;
