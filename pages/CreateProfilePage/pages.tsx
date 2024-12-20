import AboutTextInput from "@/components/AboutTextInput/AboutTextInput";
import ButtonChoice from "@/components/ButtonChoice/ButtonChoice";
import DateInput from "@/components/DateInput/DateInput";
import NameInput from "@/components/NameInput/NameInput";
import PlaceInput from "@/components/PlaceInput/PlaceInput";
import { StyleSheet, View, Text } from 'react-native';

const data = [
    {
        title: 'Привет, давай знакомиться',
        description: 'Будь собой при выборе имени, привлекает больше внимания.',
        input: <NameInput />,
        countinueButton: true,
    },
    {
        title: 'Где живем, там и ищем',
        description: 'Выбери свой город, чтобы найти ближайщих соулмейтов',
        input: <PlaceInput />,
        countinueButton: true,
    },
    {
        title: 'Выбери дату рождения',
        description: 'Используй настояющую, ее потом поменять нельзя',
        input: <DateInput />,
        countinueButton: true,
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

const contentPages = data.map((item) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        
    },
});

export default contentPages;